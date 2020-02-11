### Build Helper Documentation


#### To build the program:

```bash
make optimal
```

#### To run the program:
There are multiple options to run for the program. If you are not running with the flag `-h` or `-v`, then the `-e` (stands for execute) flag is mandatory.

```bash
# To run a simple command (as prod)
./builder -e {{command}}

# To run a simple command in specified mode
./builder -m {{mode}} -e {{command}}

# To run a simple command with log
./builder -l -e {{command}}

# To see the descriptions of each option
./builder -h

# To see the program version
./builder -v
```

#### The list of modes:

There are 2 modes currently: `dev` or `prod`. 
By default, it will run in production mode.


#### The list of commands:

For both `dev` and `prod` mode, these are available:

```
build - build the images from scratch
rebuild - stop the containers, rebuild the images from scratch, and then run the containers.
run - run (up) the containers
stop - stop the containers
status - see the current status of docker containers
images - see all the images active in docker
```

For `dev` mode only, these are available:

```
shell - to access the dev container shell
db - to access the dev postgres-db
```

#### Note:
If you want to extend any of the commands, let me know! Feel free to optimize it and make it more customizatiable :D
