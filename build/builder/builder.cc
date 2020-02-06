// THIS IS ONLY FOR SERVER ADMIN USE.
// NOT FOR THE GENERAL PUBLIC

#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <string>
#include "./dependencies/cxxopts.hpp"
#include "state.h"
#include "command.h"
#include "command_center.h"


auto parseCommand(int argc, char *argv[]){
	try {
		cxxopts::Options options("Framework Agnostic Build Helper", "A build process helper designed to streamline deployment and be platform agnostic");
		options.
			add_options()
				("m,mode", "Deployment mode (dev, prod)", cxxopts::value<std::string>()->default_value("prod"))
				("e,exec", "Execute command")
				("help", "Print help")
			;
		auto result = options.parse(argc, argv);
		return result;	
	} catch (const cxxopts::OptionException& e) {
		std::cout << "There are some errors when parsing command options" << std::endl;
		std::cout << e.what() << std::endl;
		exit(1);
	}
}


int main(int argc, char *argv[]){
	DEPLOY_STATE mode;
	std::string command;

	// Parsing arguments
	auto input_command = parseCommand(argc, argv);	
	std::string input_mode = input_command["mode"].as<std::string>();
	std::string input_exec = input_command["exec"].as<std::string>();
	if (input_mode == "dev") {
		mode = DEPLOY_STATE::DEV;
	} else {
		mode = DEPLOY_STATE::PROD;
	}
	command = input_exec;

	// Setting the program state
	State* state = new State();
	state->setMode(mode);

	// Initialize CommandCenter and execute command
	CommandCenter cmd_center = CommandCenter(state);
	cmd_center.executeCommand(command);

	return 0;
}
