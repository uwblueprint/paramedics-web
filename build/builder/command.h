#ifndef COMMAND_H
#define COMMAND_H

#include <string>
#include <vector>
#include <memory>
#include <iostream>
#include <unordered_map>
#include "state.h"
#include "logger.h"


class Command {
	std::vector<std::string> commands;
	std::string command;
	std::shared_ptr<State> state;
	
	// TODO: figure out how to get static map from boost
	bool initialized;
	std::unordered_map<std::string, std::string> file_map;
	void initialize();

protected:
	virtual void initializeContext();
	virtual void initializeFileMap();
	virtual std::string chainCommand();
	virtual std::string resolveCommand(std::string cmd);
	std::string getFile(std::string file);
	void setFile(std::string key, std::string val);
	void buildCommand();

public:
	Command(std::vector<std::string> commands, const std::shared_ptr<State>& state);
	const std::string extractCommand();
};

#endif