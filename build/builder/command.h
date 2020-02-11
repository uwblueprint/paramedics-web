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
	std::unordered_map<std::string, COMMAND_CONTEXT> context_map;
	
	void initialize();
	bool validate(std::vector<std::string>& parsed_str_vec);
	std::string resolveCommand(std::string cmd);
	
protected:
	virtual void initializeContext();
	virtual void initializeContextMap();
	virtual void initializeFileMap();

	std::string getFile(std::string file);
	void setFile(std::string key, std::string val);

	virtual bool validateContext(std::vector<std::string>& parsed_str_vec);	
	virtual std::string chainCommand();
	virtual bool unitalResolver(std::string& cmd);

	void buildCommand();

public:
	Command(std::vector<std::string> commands, const std::shared_ptr<State>& state);
	const std::string extractCommand();
};

#endif