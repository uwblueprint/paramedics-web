#include <cxxopts.hpp>
#include <stdio>
#include <stdlib>
#include <iostream>
# include <vector>
#include <string>
#include <unordered_map>

using namespace std;

// THIS IS ONLY FOR SERVER ADMIN USE.
// NOT FOR THE GENERAL PUBLIC


// READ ONLY state
class State() {
	DEPLOY_STATE mode;

public:
	enum DEPLOY_STATE { DEV, PROD };

	void setMode(State::DEPLOY_STATE mode);
	State::DEPLOY_STATE getMode();
}

void State::setMode(State::DEPLOY_STATE mode) {
	this->mode = mode;
}

DEPLOY_STATE State::getMode() {
	return this->mode;
}

// To be inherited
class Command() {
	vector<string> commands;
	string command;
	State* const state;

protected:
	virtual string chainCommand();
	virtual string resolveCommand(string cmd);
	void buildCommand();

public:
	Command(vector<string> commands, State* state);
	string extractCommand();
};

Command::Command(vector<string> commands, State* const state) {
	this->commands = commands;
	this->state = state;
	this->buildCommand();
}

virtual string Command::chainCommand() {
	string chained_command = "";
	if (this->commands.size() == 0) {
		return chained_command;
	}
	for (auto command: this->commands) {
		chained_command += " && " + command;
	}
	// Shifting by the && in the beginning
	return chained_command.substr(4);
}

virtual string Command::resolveCommand(string cmd) {
	return cmd
}

string Command::buildCommand() {
	for (auto& command: this->commands) {
		command = this->resolveCommand(command);
	}
	this->command = this->chainCommand();
}

string Command::getCommand() {
	return this->command;
}


class CommandCenter() {
	unordered_map<string, string> file_map;
	unordered_map<string, Command*> command_map;
	State* state;
	Command* getFile();
	void setFile(string key, string val);
	Command* getCommand();
	void setCommand(string key, Command* cmd);
	void initializeFileMap(State::DEPLOY_STATE mode);
	void initializeCommandMap(State::DEPLOY_STATE mode);
	Boolean evaluate(Command cmd);

public:
	CommandCenter(State* state);
	~CommandCenter();
	Boolean executeCommand(string cmd);
};

CommandCenter::CommandCenter(State* state) {
	this->state = state;
	this->initializeFileMap(mode);
	this->initializeCommandMap(mode);
	cout << "Command Center Initialized" << endl;
}

CommandCenter::~CommandCenter() {
	for (auto& command: this->command_map) {
		delete command;
	}
	delete this->state;
}

// Ideally read from a config, and provide a default config
void CommandCenter::initializeFileMap() {
	auto mode = this->state->getMode();
	switch (mode) {
		case DEV:
			this->setFile("dockerfile", "Dockerfile.dev");
			this->setFile("docker-compose", "docker-compose-dev.yaml");
			break;
		case PROD:
			this->setFile("dockerfile", "Dockerfile.prod");
			this->setFile("docker-compose", "docker-compose-prod.yaml");
			break;
	}
}

void CommandCenter::initializeCommandMap() {
	auto mode = this->state->getMode();
	// Initialize Command Map
	switch (mode) {
		case DEV:
			this->setCommand("build", new Command(vector<string>{}, this->state));
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			// this->setMap("shell", );
			// this->setMap("database", );
			break;
		case PROD:
			// this->setMap("build", "");
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			break;
	}
	// Core common commands
}

Boolean CommandCenter::evaluate(Command* command) {
	int return_code = system(command->extractCommand());
	if (return_code != 0) {
		cout << "Something went wrong during command evaluation" << endl;
		return False;
	}
	return true;	
}

string CommandCenter::getFile(string file) {
	return this->file_map.at(file);
}

void CommandCenter::setFile(string key, string val) {
	this->file_map.insert({key: val});
}

Command* CommandCenter::getCommand(string cmd) {
	return this->file_map.at(cmd);
}

void CommandCenter::setCommand(string key, Command* cmd) {
	this->command_map.insert({key: cmd});
}

Boolean CommandCenter::executeCommand(string cmd) {
	Command* command = this->getCommand(cmd);
	return this->evaluate(command);
}

auto parseCommand(){
	try {
		cxxopts::Options options("Framework Agnostic Build Helper", "A build process helper designed to streamline deployment and be platform agnostic");
		options.
			add_options()
				("m,mode", "Deployment mode (dev, prod)", cxxopts::value<string>()->default_value("prod"))
				("e,exec", "Execute command")
				("help", "Print help")
			;
		auto result = options.parse(argc, argv);
		return result;	
	} catch (cxxopts::OptionException& e) {
		cout << "There are some errors when parsing command options" << endl;
		cout << e << endl;
		exit(1);
	}
}


int main(int argc, char *argv[]){
	State::DEPLOY_STATE mode;
	string command;

	// Parsing arguments
	auto input_command = parseCommand();	
	string input_mode = input_command.as<string>();
	string input_exec = input_command.as<string>();
	if (input_mode == "dev") {
		mode = DEV;
	} else {
		mode = Prod;
	}
	command = input_exec;

	// Setting the program state
	auto state = new State();
	state->setMode(mode);

	// Initialize CommandCenter and execute command
	CommandCenter cmd_center = CommandCenter(state);
	cmd_center.executeCommand(command);

	return 0;
}
