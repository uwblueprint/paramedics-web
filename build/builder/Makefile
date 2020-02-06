PROGRAM_NAME = builder

CXX = g++
CXXFLAGS = -std=c++17 -O3 -MMD -Werror=vla --verbose
EXEC = ${PROGRAM_NAME}
OBJECTS = ${PROGRAM_NAME}.o state.o command.o command_center.o
DEPENDS = ${OBJECTS:.o=.d}
DESTINATION = ../../

-include ${DEPENDS}

.PHONY: clean compile build

clean:
	rm ${OBJECTS} ${DEPENDS}

compile:
	${CXX} ${CXXFLAGS} -c ${PROGRAM_NAME}.cc

build: ${OBJECTS}
	@${CXX} ${CXXFLAGS} -c ${PROGRAM_NAME}.cc
	@${CXX} ${OBJECTS} -o ${EXEC}
	@rm ${OBJECTS} ${DEPENDS}
	@mv ${EXEC} ${DESTINATION}
