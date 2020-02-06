PROGRAM_NAME = builder

CXX = g++
CXXFLAGS = -std=c++14 -MMD -Werror=vla
EXEC = ${PROGRAM_NAME}
OBJECTS = ${PROGRAM_NAME}.o state.o command.o command_center.o

DEPENDS = ${OBJECTS:.o=.d}

${EXEC}: ${OBJECTS}
	${CXX} ${OBJECTS} -o ${EXEC}

-include ${DEPENDS}

.PHONY: clean compile

clean:
	rm ${OBJECTS} ${DEPENDS}

compile:
	g++ -std=c++14 -o -c -MMD ${PROGRAM_NAME}.cc

