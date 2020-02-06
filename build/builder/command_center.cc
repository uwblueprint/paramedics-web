CommandCenter::CommandCenter(State* state) {
	this->state = state;
	this->initializeFileMap(mode);
	this->initializeCommandMap(mode);
	cout << "Command Center Initialized" << endl;
}

CommandCenter::~CommandCenter() {
	for (auto& command: this->command_map) {
		delete command;
	}
	delete this->state;
}

// Ideally read from a config, and provide a default config
void CommandCenter::initializeFileMap() {
	auto mode = this->state->getMode();
	switch (mode) {
		case DEV:
			this->setFile("dockerfile", "Dockerfile.dev");
			this->setFile("docker-compose", "docker-compose-dev.yaml");
			break;
		case PROD:
			this->setFile("dockerfile", "Dockerfile.prod");
			this->setFile("docker-compose", "docker-compose-prod.yaml");
			break;
	}
}

void CommandCenter::initializeCommandMap() {
	auto mode = this->state->getMode();
	// Initialize Command Map
	switch (mode) {
		case DEV:
			this->setCommand("build", new Command(vector<string>{}, this->state));
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			// this->setMap("shell", );
			// this->setMap("database", );
			break;
		case PROD:
			// this->setMap("build", "");
			// this->setMap("rebuild", );
			// this->setMap("run", );
			// this->setMap("stop", );
			// this->setMap("images", );
			// this->setMap("status", );
			break;
	}
	// Core common commands
}

Boolean CommandCenter::evaluate(Command* command) {
	int return_code = system(command->extractCommand());
	if (return_code != 0) {
		cout << "Something went wrong during command evaluation" << endl;
		return False;
	}
	return true;	
}

string CommandCenter::getFile(string file) {
	return this->file_map.at(file);
}

void CommandCenter::setFile(string key, string val) {
	this->file_map.insert({key: val});
}

Command* CommandCenter::getCommand(string cmd) {
	return this->file_map.at(cmd);
}

void CommandCenter::setCommand(string key, Command* cmd) {
	this->command_map.insert({key: cmd});
}

Boolean CommandCenter::executeCommand(string cmd) {
	Command* command = this->getCommand(cmd);
	return this->evaluate(command);
}
