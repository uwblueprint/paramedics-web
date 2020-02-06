#include "command.h"


Command::Command(std::vector<std::string> commands, State* const state) :
state (state)
{
	this->commands = commands;
	this->buildCommand();
}

std::string Command::chainCommand() {
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
	return cmd;
}

void Command::buildCommand() {
	for (auto& command: this->commands) {
		command = this->resolveCommand(command);
	}
	this->command = this->chainCommand();
}

std::string const Command::extractCommand() {
	return this->command;
}