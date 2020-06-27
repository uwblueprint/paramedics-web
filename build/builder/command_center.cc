#include "command_center.h"


CommandCenter::CommandCenter(const std::shared_ptr<State>& state) : 
state(std::move(state))
{	
	Logger::log("Initializing command center");
	this->initializeCommandMap();
}

std::unique_ptr<Command> CommandCenter::makeCommand(const std::vector<std::string>& cmd_vec) {
	return std::make_unique<Command>(cmd_vec, this->state);
}

void CommandCenter::initializeCommandMap() {
	Logger::log("Initializing command map");
	auto mode = this->state->getMode();

	switch (mode) {
		case DEPLOY_STATE::DEV:
		{
			this->setCommand(
				"shell", 
				this->makeCommand(std::vector<std::string>{
					"docker-compose -f {{RESOLVER file dockercompose}} exec paramedics-api bash"
				})
			);
			this->setCommand(
				"db", 
				this->makeCommand(std::vector<std::string>{
					"docker-compose -f {{RESOLVER file dockercompose}} exec paramedics-db psql paramedics-db -U robot"
				})
			);
			break;
		}
		case DEPLOY_STATE::PROD:
		{
			/*	
				Add command here like above if there is any specific 
				production related command that we need
			*/
			break;
		}
	}

	// Commands that can and should be parsed for both types
	this->setCommand(
		"build", 
		this->makeCommand(std::vector<std::string>{
			"docker build -f {{RESOLVER file dockerfile}} ."
		})
	);
	this->setCommand(
		"rebuild", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} stop",
			"docker-compose -f {{RESOLVER file dockercompose}} up -d -V --build",
		})
	);
	this->setCommand(
		"rebuild-hard", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} down",
			"docker build -f {{RESOLVER file dockerfile}} . --no-cache",
			"docker-compose -f {{RESOLVER file dockercompose}} up -d",
		})
	);
	this->setCommand(
		"rm-volume", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} down -v",
		})
	);
	this->setCommand(
		"run", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} up -d"
		})
	);
	this->setCommand(
		"stop", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} down"
		})
	);
	this->setCommand(
		"images", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} images"
		})
	);
	this->setCommand(
		"status", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} ps"
		})
	);
	this->setCommand(
		"logs", 
		this->makeCommand(std::vector<std::string>{
			"docker-compose -f {{RESOLVER file dockercompose}} logs --follow"
		})
	);
}

bool CommandCenter::evaluate(const std::unique_ptr<Command>& command) {
	Logger::log("Evaluating command");
	auto cmd_new = command->extractCommand();
	const char* cmd = cmd_new.c_str();
	auto return_code = system(cmd);
	if (return_code != 0) {
		Logger::log("Something went wrong during command evaluation in system", LOG_LEVEL::SYSTEM);
		throw std::runtime_error("Something went wrong during eval");
	}
	return true;	
}

const std::unique_ptr<Command>& CommandCenter::getCommand(std::string cmd) {
	try {
		return this->command_map.at(cmd);
	} catch (const std::out_of_range& oor) {
		Logger::log("No command exist with name " + cmd, LOG_LEVEL::SYSTEM);
		throw oor;
	}
}

void CommandCenter::setCommand(std::string key, std::unique_ptr<Command> cmd) {
	this->command_map[key] = std::move(cmd);
}

bool CommandCenter::executeCommand(std::string cmd) {
	Logger::log("Executing command");
	auto success = this->evaluate(this->getCommand(cmd));
	return success;
}
