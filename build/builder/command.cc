#include "command.h"


Command::Command(std::vector<std::string> commands, const std::shared_ptr<State>& state) :
state (std::move(state))
{	
	Logger::log("INFO: Initializing command");
	this->initialized = false;
	this->commands = commands;
	this->initialize();
	this->buildCommand();
}	

void Command::initialize() {
	// Initializing context
	if (!this->initialized) {
		Logger::log("INFO: Initializing command context");
		this->initializeContext();
		this->initialized = true;
	} else {
		Logger::log("INFO: Command context already initialized");
	}
}

void Command::initializeContext() {
	// Add more context builder here when needed
	this->initializeFileMap();
}

// Ideally read from a config, and provide a default config
void Command::initializeFileMap() {
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

std::string Command::getFile(std::string file) {
	return this->file_map.at(file);
}

void Command::setFile(std::string key, std::string val) {
	this->file_map.insert(std::pair<std::string, std::string>(key, val));
}

std::string Command::chainCommand() {
	Logger::log("INFO: Chaining commands");
	std::string chained_command = "";
	if (this->commands.size() == 0) {
		return chained_command;
	}
	for (auto command: this->commands) {
		chained_command += " && " + command;
	}
	// Shifting by the && in the beginning
	return chained_command.substr(4);
}

std::string Command::resolveCommand(std::string cmd) {
	Logger::log("INFO: Resolving command");
	// Find ${RESOLVER file dockerfile}$ and replace it with file[dockerfile]
	return cmd;
}

void Command::buildCommand() {
	Logger::log("INFO: Building command");
	for (auto& command: this->commands) {
		command = this->resolveCommand(command);
	}
	this->command = this->chainCommand();
}

const std::string Command::extractCommand() {
	return this->command;
}