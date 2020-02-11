#include "state.h"


void State::setMode(DEPLOY_STATE mode) {
	this->mode = mode;
}

DEPLOY_STATE State::getMode() {
	return this->mode;
}
