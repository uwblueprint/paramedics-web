PROGRAM_NAME = builder

CXX = g++
CXXFLAGS = -std=c++17 -O3 -MMD -Werror=vla 
EXEC = ${PROGRAM_NAME}
OBJECTS = ${PROGRAM_NAME}.o state.o command.o command_center.o logger.o
DEPENDS = ${OBJECTS:.o=.d}
DESTINATION = ../../

-include ${DEPENDS}

.PHONY: clean link compile build

clean:
	rm ${OBJECTS} ${DEPENDS}

link:
	${CXX} ${CXXFLAGS} -c ${PROGRAM_NAME}.cc

compile: ${OBJECTS}
	@${CXX} ${OBJECTS} -o ${EXEC}
	@rm ${OBJECTS} ${DEPENDS}
	@mv ${EXEC} ${DESTINATION}

optimal: ${OBJECTS}
	@${CXX} ${CXXFLAGS} -c ${PROGRAM_NAME}.cc
	@${CXX} ${OBJECTS} -o ${EXEC}
	@rm ${OBJECTS} ${DEPENDS}
	@mv ${EXEC} ${DESTINATION}