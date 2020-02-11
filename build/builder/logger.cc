#include "logger.h"


std::unique_ptr<Logger> Logger::logger_instance = nullptr;
bool Logger::initialized = false;

Logger::Logger(LOG_LEVEL level) {
	this->level = level;
}

LOG_LEVEL Logger::getLevel() {
	return this->level;
}

void Logger::log(std::string msg, LOG_LEVEL log_level) {
	// Only log information when the level set encapsulates this level of log
	if (Logger::getLogger().getLevel() >= log_level) {
		std::string level_str = "";
		LOG_LEVEL level = log_level;
		switch (level) {
			case LOG_LEVEL::SYSTEM:
			{
				level_str = "SYSTEM";
				break;
			}
			case LOG_LEVEL::DEFAULT: 
			{
				level_str = "DEFAULT";
				break;
			}
			case LOG_LEVEL::INFO:
			{
				level_str = "INFO";
				break;	
			} 
			case LOG_LEVEL::DEBUG: 
			{
				level_str = "DEBUG";
				break;
			}
		}

		auto now = std::chrono::system_clock::now();
		auto time = std::chrono::system_clock::to_time_t (now);

		// Uncomment this for millisecond percison log
		// auto duration = std::chrono::system_clock::now().time_since_epoch();
		// auto millis = std::chrono::duration_cast<std::chrono::milliseconds>(duration).count();
		// std::cout << millis << " - [" << level_str << "] : " << msg << std::endl;

		std::cout << ctime(&time) << "[" << level_str << "] : " << msg << std::endl;
	}
}

Logger & Logger::getLogger(LOG_LEVEL level) {
	if (!Logger::initialized) {
		Logger::initialized = true;
		Logger::logger_instance = std::make_unique<Logger>(level);
	}
	return *(Logger::logger_instance);
}