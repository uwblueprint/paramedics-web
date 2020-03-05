// THIS IS ONLY FOR SERVER ADMIN USE.
// NOT FOR THE GENERAL PUBLIC

#include <stdio.h>
#include <stdlib.h>
#include <iostream>
#include <string>
#include <memory>
#include "./dependencies/cxxopts.hpp"
#include "enum.h"
#include "state.h"
#include "command.h"
#include "command_center.h"
#include "logger.h"


const std::string PROGRAM_NAME = "Platform Agnostic Build Process Helper";
const std::string PROGRAM_VERSION = "v0.1";

const std::string DEFAULT_OPTION_MODE = "dev";
const std::string DEFAULT_OPTION_EXEC = "";

auto parseCommand(int argc, char *argv[]){
	try {
		cxxopts::Options options(argv[0], "A platform agnostic build process helper designed to streamline deployment");
		options.
			add_options()
				("m,mode", "Deployment mode", cxxopts::value<std::string>()->default_value(DEFAULT_OPTION_MODE))
				("e,exec", "Command to execute", cxxopts::value<std::string>()->default_value(DEFAULT_OPTION_EXEC))
				("l,log", "Verbose logging mode", cxxopts::value<bool>()->default_value("false")->implicit_value("true"))
				("v,version", "Show version", cxxopts::value<bool>()->default_value("false")->implicit_value("true"))
				("h,help", "Show help message", cxxopts::value<bool>()->default_value("false")->implicit_value("true"))
			;
		auto result = options.parse(argc, argv);

		// Handles all non-core logic options
		if (result["help"].as<bool>()) {
			std::cout << options.help({""}) << std::endl;
		}

		if (result["version"].as<bool>()) {
			std::cout << PROGRAM_NAME << " : " << PROGRAM_VERSION << std::endl;
		}
		
		return result;	
	} catch (const cxxopts::OptionException& e) {
		std::cout << "There are some errors when parsing command options" << std::endl;
		std::cout << e.what() << std::endl;
		exit(1);
	}
}

int main(int argc, char *argv[]){
	int exit_code = 0;

	// Initializing State variables
	DEPLOY_STATE mode;
	std::string command;

	// Parsing arguments
	// std::cout << "INFO: Parsing arguments" << std::endl;
	auto input_command = parseCommand(argc, argv);

	// Extracting arguments
	// std::cout << "INFO: Extracting and cleaning arguments" << std::endl;

	// Commands that do not involve core logic
	auto input_help = input_command["help"].as<bool>();
	auto input_version = input_command["version"].as<bool>();

	// Return 0 exit code if help was called
	if (input_help || input_version) {
		return exit_code;
	}

	auto input_mode = input_command["mode"].as<std::string>();
	auto input_log = input_command["log"].as<bool>();
	auto input_exec = input_command["exec"].as<std::string>();

	// Initializing Logger
	if (input_log) {
		Logger & logger = Logger::getLogger(LOG_LEVEL::DEBUG);
	} else {
		Logger & logger = Logger::getLogger(LOG_LEVEL::DEFAULT);
	}
	Logger & logger = Logger::getLogger();

	if (input_mode == DEFAULT_OPTION_MODE) {
		mode = DEPLOY_STATE::DEV;
	} else {
		mode = DEPLOY_STATE::PROD;
	}

	if (input_exec == "") {
		logger.log("Execution input cannot be empty/uninitialized", LOG_LEVEL::SYSTEM);
		return exit_code;
	}

	command = input_exec;

	// Setting the program state
	logger.log("Setting builder state");
	auto state = std::make_shared<State>();
	state->setMode(mode);

	// Initialize CommandCenter and execute command
	logger.log("Begin core command execution logic");
	try {
		auto cmd_center = CommandCenter(state);
		cmd_center.executeCommand(command);
	} catch (...) {
		// TODO: handle exit code or exception better
		exit_code = 1;
		logger.log("An error occured in command center", LOG_LEVEL::SYSTEM);
		logger.log("Exiting now with exit code " + std::to_string(exit_code), LOG_LEVEL::SYSTEM);
		return exit_code;
	}
	return exit_code;
}
