#ifndef COMMANDCENTER_H
#define COMMANDCENTER_H

#include <iostream>
#include <string>
#include <vector>
#include <unordered_map>
#include "state.h"
#include "command.h"


class CommandCenter {
	std::unordered_map<std::string, std::string> file_map;
	std::unordered_map<std::string, Command*> command_map;
	State* state;
	std::string getFile(std::string file);
	void setFile(std::string key, std::string val);
	Command* getCommand(std::string cmd);
	void setCommand(std::string key, Command* cmd);
	void initializeFileMap();
	void initializeCommandMap();
	bool evaluate(Command* cmd);

public:
	CommandCenter(State* state);
	~CommandCenter();
	bool executeCommand(std::string cmd);
};

#endif