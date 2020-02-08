#ifndef LOGGER_H
#define LOGGER_H

#include <iostream>
#include <string>
#include <memory>
#include <ctime>
#include <chrono>
#include "enum.h"


class Logger {
    static std::unique_ptr<Logger> logger_instance;
    static bool initialized;
	LOG_LEVEL level;

public:
    Logger(LOG_LEVEL level);
	Logger(Logger const &) = delete;
    void operator=(Logger const &) = delete;
    LOG_LEVEL getLevel();
    static Logger & getLogger(LOG_LEVEL level=LOG_LEVEL::DEFAULT);
    static void log(std::string msg, LOG_LEVEL level=LOG_LEVEL::INFO);
};

#endif