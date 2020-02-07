#ifndef COMMAND_H
#define COMMAND_H

#include <string>
#include <vector>
#include <memory>
#include <iostream>
#include "state.h"
#include "logger.h"


class Command {
	std::vector<std::string> commands;
	std::string command;
	std::shared_ptr<State> state;

protected:
	virtual std::string chainCommand();
	virtual std::string resolveCommand(std::string cmd);
	void buildCommand();

public:
	Command() = delete;
	Command(std::vector<std::string> commands, const std::shared_ptr<State>& state);
	const std::string extractCommand();
};

#endif