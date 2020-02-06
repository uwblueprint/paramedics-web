#include "command_center.h"


CommandCenter::CommandCenter(State* state) {
	this->state = state;
	this->initializeFileMap();
	this->initializeCommandMap();
	std::cout << "Command Center Initialized" << std::endl;
}

CommandCenter::~CommandCenter() {
	for (auto& command: this->command_map) {
		delete command.second;
	}
	delete this->state;
}

// Ideally read from a config, and provide a default config
void CommandCenter::initializeFileMap() {
	auto mode = this->state->getMode();
	switch (mode) {
		case DEPLOY_STATE::DEV:
			this->setFile("dockerfile", "Dockerfile.dev");
			this->setFile("docker-compose", "docker-compose-dev.yaml");
			break;
		case DEPLOY_STATE::PROD:
			this->setFile("dockerfile", "Dockerfile.prod");
			this->setFile("docker-compose", "docker-compose-prod.yaml");
			break;
	}
}

void CommandCenter::initializeCommandMap() {
	auto mode = this->state->getMode();
	// Initialize Command Map
	switch (mode) {
		case DEPLOY_STATE::DEV:
			this->setCommand(
				"build", 
				new Command(std::vector<std::string>(), this->state)
			);
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			// this->setMap("shell", );
			// this->setMap("database", );
			break;
		case DEPLOY_STATE::PROD:
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

bool CommandCenter::evaluate(Command* command) {
	int return_code = system("");
	if (return_code != 0) {
		std::cout << "Something went wrong during command evaluation" << std::endl;
		return false;
	}
	return true;	
}

std::string CommandCenter::getFile(std::string file) {
	return this->file_map.at(file);
}

void CommandCenter::setFile(std::string key, std::string val) {
	this->file_map.insert(std::pair<std::string, std::string>(key, val));
}

Command* CommandCenter::getCommand(std::string cmd) {
	return this->command_map.at(cmd);
}

void CommandCenter::setCommand(std::string key, Command* cmd) {
	this->command_map.insert(std::pair<std::string, Command*>(key, cmd));
}

bool CommandCenter::executeCommand(std::string cmd) {
	Command* command = this->getCommand(cmd);
	return this->evaluate(command);
}
