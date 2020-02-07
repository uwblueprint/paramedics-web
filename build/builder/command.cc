#include "command.h"


const std::string RESOLVE_VALIDATOR = "RESOLVER";

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
	// TODO: this only parses for one replace, we can extend it for n replacements
	Logger::log("INFO: Resolving command");
	// Find the beginning and end of the text to parse
	std::size_t begin = cmd.find("{{");
	std::size_t end = cmd.find("}}");
	if ((begin == std::string::npos) && (end == std::string::npos)) {
		// Nothing to replace
		return cmd;
	} else if ((begin == std::string::npos) != (end == std::string::npos)) {
		// Only has {{ or }} inside the string
		Logger::log("ERROR: Missing the beginning/ending scope for parsing the input string", LOG_LEVEL::SYSTEM);
		throw std::invalid_argument("Parse string has format issues");
	} else {
		// Core resolver logic if there is anything to replace
		begin += 2;
		auto raw_string = cmd.substr(begin, end - begin);
		std::vector<std::string> tokens;

		int result = 0;
		int cur_idx = 0;
		while (result != std::string::npos) {
			tokens.push_back(raw_string.substr(cur_idx, result-cur_idx));
			cur_idx = result;
			result = raw_string.find(" ", cur_idx);
		}
		tokens.push_back(raw_string.substr(cur_idx));
		
		// Validation
		if (tokens.at(0) != RESOLVE_VALIDATOR) {
			Logger::log("Parsed section failed validation check", LOG_LEVEL::SYSTEM);
			throw std::runtime_error("Parsed section failed validation check");
		}

		// Retrieving data from mapping
		// TODO: Made enum map from string to enum
		// Determin the type from tokens.at(1)
		int bucket = 0;
		std::string replace_string;
		switch (bucket) {
			case 0:
			{
				// Get object based on tokens.at(2)
				break;
			}
		}
		
		// Replace with final resolved string

	}

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