// THIS IS ONLY FOR SERVER ADMIN USE.
// NOT FOR THE GENERAL PUBLIC

#include <stdio>
#include <stdlib>
#include <iostream>
#include <string>
#include ".dependencies/cxxopts.hpp"
#include "state.h"
#include "command.h"
#include "command_center.h"


auto parseCommand(){
	try {
		cxxopts::Options options("Framework Agnostic Build Helper", "A build process helper designed to streamline deployment and be platform agnostic");
		options.
			add_options()
				("m,mode", "Deployment mode (dev, prod)", cxxopts::value<string>()->default_value("prod"))
				("e,exec", "Execute command")
				("help", "Print help")
			;
		auto result = options.parse(argc, argv);
		return result;	
	} catch (cxxopts::OptionException& e) {
		cout << "There are some errors when parsing command options" << endl;
		cout << e << endl;
		exit(1);
	}
}


int main(int argc, char *argv[]){
	State::DEPLOY_STATE mode;
	std::string command;

	// Parsing arguments
	auto input_command = parseCommand();	
	std::string input_mode = input_command.as<std::string>();
	std::string input_exec = input_command.as<std::string>();
	if (input_mode == "dev") {
		mode = DEV;
	} else {
		mode = Prod;
	}
	command = input_exec;

	// Setting the program state
	auto state = new State();
	state->setMode(mode);

	// Initialize CommandCenter and execute command
	CommandCenter cmd_center = CommandCenter(state);
	cmd_center.executeCommand(command);

	return 0;
}
