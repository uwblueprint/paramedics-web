#import "state.h"


void State::setMode(State::DEPLOY_STATE mode) {
	this->mode = mode;
}

DEPLOY_STATE State::getMode() {
	return this->mode;
}
