#include "command.h"


Command::Command(std::vector<std::string> commands, const std::shared_ptr<State>& state) :
state (std::move(state))
{	
	Logger::log("INFO: Initializing command");
	this->commands = commands;
	this->buildCommand();
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