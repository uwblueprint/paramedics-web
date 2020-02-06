#include "command.h"


Command::Command(std::vector<std::string> commands, State* const state) {
	this->commands = commands;
	this->state = state;
	this->buildCommand();
}

virtual std::string Command::chainCommand() {
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

virtual std::string Command::resolveCommand(std::string cmd) {
	return cmd
}

std::string Command::buildCommand() {
	for (auto& command: this->commands) {
		command = this->resolveCommand(command);
	}
	this->command = this->chainCommand();
}

std::string Command::getCommand() {
	return this->command;
}