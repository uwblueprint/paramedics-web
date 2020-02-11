#include "command.h"


const std::string RESOLVE_VALIDATOR = "RESOLVER";

Command::Command(std::vector<std::string> commands, const std::shared_ptr<State>& state) :
state (std::move(state))
{	
	Logger::log("Initializing command");
	this->initialized = false;
	this->commands = commands;
	this->initialize();
}	

void Command::initialize() {
	// Initializing context
	if (!this->initialized) {
		Logger::log("Initializing command context");
		this->initializeContext();
		this->initialized = true;
	} else {
		Logger::log("Command context already initialized");
	}
}

void Command::initializeContextMap() {
	// Add more to the map when there are more contexts
	this->context_map["file"] = COMMAND_CONTEXT::COMMAND_FILE;
}

void Command::initializeContext() {
	// Add more context builder here when needed
	this->initializeContextMap();
	this->initializeFileMap();
}

// Ideally read from a config, and provide a default config
void Command::initializeFileMap() {
	Logger::log("Initializing file map");
	
	auto mode = this->state->getMode();
	std::string default_path = "";

	switch (mode) {
		case DEPLOY_STATE::DEV:
		{
			this->setFile("dockerfile", default_path + "Dockerfile.dev");
			this->setFile("dockercompose", default_path + "docker-compose-dev.yaml");
			break;
		}
		case DEPLOY_STATE::PROD:
		{
			this->setFile("dockerfile", default_path + "Dockerfile.prod");
			this->setFile("dockercompose", default_path + "docker-compose-prod.yaml");
			break;
		}
	}
}

std::string Command::getFile(std::string file) {
	return this->file_map.at(file);
}

void Command::setFile(std::string key, std::string val) {
	this->file_map.insert(std::pair<std::string, std::string>(key, val));
}

std::string Command::chainCommand() {
	Logger::log("Chaining commands");
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

bool Command::unitalResolver(std::string& cmd) {
	Logger::log("Resolving command");
	// Find the beginning and end of the text to parse
	auto begin = cmd.find("{{");
	auto end = cmd.find("}}");
	if ((begin == std::string::npos) && (end == std::string::npos)) {
		Logger::log("Performing NOP resolve");
		// Nothing to replace
		return true;
	} else if ((begin == std::string::npos) != (end == std::string::npos)) {
		// Only has {{ or }} inside the string
		Logger::log("Missing the beginning/ending scope for parsing the input string", LOG_LEVEL::SYSTEM);
		throw std::invalid_argument("Parse string has format issues");
	} else {
		Logger::log("Starting core parsing logic");
		
		// Core resolver logic if there is anything to replace
		int parse_begin = begin + 2;
		int parse_end = end;

		auto raw_string = cmd.substr(parse_begin, parse_end - parse_begin);
		std::vector<std::string> tokens;
		
		Logger::log("Parsing string section " + raw_string);
		
		int prev_idx = 0;
		int cur_idx = 0;
		while (raw_string[cur_idx]) {
			if (isblank(raw_string[cur_idx])) {
				// Add the token to the token list
				tokens.push_back(raw_string.substr(prev_idx, cur_idx-prev_idx));
				prev_idx = cur_idx + 1;
			}
			++cur_idx;
		}
		tokens.push_back(raw_string.substr(prev_idx));
		
		// Validation
		Logger::log("Validating parsed command tokens");
		auto validated = this->validate(tokens);
		Logger::log("Passed command validation with status");

		auto bucket = this->context_map.at(tokens.at(1));
		std::string replace_string;
		switch (bucket) {
			case COMMAND_CONTEXT::COMMAND_FILE:
			{
				replace_string = this->file_map.at(tokens.at(2));
				break;
			}
			default:
			{
				throw std::runtime_error("This should not have passed parser validation test.");
			}
		}
		
		// Replace with final resolved string
		int replace_begin = begin;
		int replace_end = end + 2;
		cmd.replace(replace_begin, replace_end-replace_begin, replace_string);
		return false;
	}
}


std::string Command::resolveCommand(std::string cmd) {
	int count = 0;
	while (!this->unitalResolver(cmd)) {
		count++;
		Logger::log("Resolving parse section " + std::to_string(count));
	}
	return cmd;
}

bool Command::validateContext(std::vector<std::string>& parsed_str_vec){
	if (parsed_str_vec.at(0) != RESOLVE_VALIDATOR) {
		return false;
	}
	try {
		auto c_map = this->context_map.at(parsed_str_vec.at(1));
	} catch (const std::out_of_range & oor) {
		return false;
	}
	return true;
}

bool Command::validate(std::vector<std::string>& parsed_str_vec) {
	bool result = true;
	try {
		result &= this->validateContext(parsed_str_vec);
	} catch (...) {
		Logger::log("Parsed section runtime error during validation check", LOG_LEVEL::SYSTEM);
		throw std::runtime_error("Parsed section runtime error during validation check");
	}
	if (!result) {
		Logger::log("Parsed section failed validation check", LOG_LEVEL::SYSTEM);
		throw std::runtime_error("Parsed section failed validation check");	
	}
	return result;
}

void Command::buildCommand() {
	Logger::log("Building command");
	for (auto& command: this->commands) {
		command = this->resolveCommand(command);
	}
	this->command = this->chainCommand();
	Logger::log("Finished building command: " + this->command);
}

const std::string Command::extractCommand() {
	this->buildCommand();
	return this->command;
}