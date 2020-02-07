#include "logger.h"


std::unique_ptr<Logger> Logger::logger_instance = nullptr;
bool Logger::initialized = false;

Logger::Logger(LOG_LEVEL level) {
	this->level = level;
}

LOG_LEVEL Logger::getLevel() {
	return this->level;
}

void Logger::log(std::string msg, LOG_LEVEL level) {
	// Only log information when the level set encapsulates this level of log
	if (Logger::getLogger().getLevel() >= level) {
		std::cout << msg << std::endl;
	}
}

Logger & Logger::getLogger(LOG_LEVEL level) {
	if (!Logger::initialized) {
		Logger::initialized = true;
		Logger::logger_instance = std::make_unique<Logger>(level);
	}
	return *(Logger::logger_instance);
}