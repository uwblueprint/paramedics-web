#ifndef COMMAND_H
#define COMMAND_H

#include <string>
#include <vector>
#include "state.h"


class Command {
	std::vector<std::string> commands;
	std::string command;
	State* const state;

protected:
	virtual std::string chainCommand();
	virtual std::string resolveCommand(std::string cmd);
	void buildCommand();

public:
	Command(std::vector<std::string> commands, State* state);
	std::string const extractCommand();
};

#endif