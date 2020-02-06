#ifndef STATE_H
#define STATE_H


class State() {
	DEPLOY_STATE mode;

public:
	enum DEPLOY_STATE { DEV, PROD };

	void setMode(State::DEPLOY_STATE mode);
	State::DEPLOY_STATE getMode();
}