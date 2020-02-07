#include "command_center.h"


CommandCenter::CommandCenter(const std::shared_ptr<State>& state) : 
state(std::move(state))
{	
	Logger::log("INFO: Initializing command center");
	this->initializeFileMap();
	this->initializeCommandMap();
}

CommandCenter::~CommandCenter() {}

// Ideally read from a config, and provide a default config
void CommandCenter::initializeFileMap() {
	Logger::log("INFO: Initializing file map");
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


std::unique_ptr<Command> CommandCenter::makeCommand(const std::vector<std::string>& cmd_vec) {
	return std::make_unique<Command>(cmd_vec, this->state);
}

void CommandCenter::initializeCommandMap() {
	Logger::log("INFO: Initializing command map");
	auto mode = this->state->getMode();
	// Initialize Command Map
	switch (mode) {
		case DEPLOY_STATE::DEV:
		{
			auto cmd_vec = std::vector<std::string>{"echo 'hi'"};
			this->setCommand(
				"build", 
				this->makeCommand(cmd_vec)
			);
			auto cmd_vec2 = std::vector<std::string>{"echo 'hi2'"};
			this->setCommand(
				"rebuild", 
				this->makeCommand(cmd_vec2)
			);
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			// this->setMap("shell", );
			// this->setMap("database", );
			break;
		}
		case DEPLOY_STATE::PROD:
		{
			// this->setMap("build", "");
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			break;
		}
	}
	// Core common commands
}

bool CommandCenter::evaluate(const std::unique_ptr<Command>& command) {
	Logger::log("INFO: Evaluating command");
	auto cmd = command->extractCommand().c_str();;
	auto return_code = system(cmd);
	if (return_code != 0) {
		Logger::log("Something went wrong during command evaluation in system", LOG_LEVEL::SYSTEM);
		throw std::system_error();
	}
	return true;	
}

std::string CommandCenter::getFile(std::string file) {
	return this->file_map.at(file);
}

void CommandCenter::setFile(std::string key, std::string val) {
	this->file_map.insert(std::pair<std::string, std::string>(key, val));
}

const std::unique_ptr<Command>& CommandCenter::getCommand(std::string cmd) {
	try {
		return this->command_map.at(cmd);
	} catch (const std::out_of_range& oor) {
		Logger::log("No command exist with name " + cmd, LOG_LEVEL::SYSTEM);
		throw oor;
	}
}

void CommandCenter::setCommand(std::string key, std::unique_ptr<Command> cmd) {
	this->command_map[key] = std::move(cmd);
}

bool CommandCenter::executeCommand(std::string cmd) {
	Logger::log("INFO: Executing command");
	auto success = this->evaluate(this->getCommand(cmd));
	return success;
}
