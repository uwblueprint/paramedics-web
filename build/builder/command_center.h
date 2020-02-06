#ifndef COMMANDCENTER_H
#define COMMANDCENTER_H

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include "state.h"
#include "command.h"


class CommandCenter() {
	std::unordered_map<std::string, std::string> file_map;
	std::unordered_map<std::string, Command*> command_map;
	State* state;
	Command* getFile();
	void setFile(std::string key, std::string val);
	Command* getCommand();
	void setCommand(std::string key, Command* cmd);
	void initializeFileMap(State::DEPLOY_STATE mode);
	void initializeCommandMap(State::DEPLOY_STATE mode);
	Boolean evaluate(Command cmd);

public:
	CommandCenter(State* state);
	~CommandCenter();
	Boolean executeCommand(std::string cmd);
};