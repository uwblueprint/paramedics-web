#ifndef STATE_H
#define STATE_H

#include "enum.h"


class State {
	DEPLOY_STATE mode;

public:
	void setMode(DEPLOY_STATE mode);
	DEPLOY_STATE getMode();
};

#endif