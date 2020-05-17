# paramedics-web
🚑 Web Server (Node.js + Express + GraphQL)


## Setup

You will need docker installed and running - [Docker Desktop](https://www.docker.com/products/docker-desktop) is likely what you want. More specifically, we want to have both `docker` and `docker-compose` installed.

1. clone this repo

```
git clone https://github.com/uwblueprint/paramedics-web.git
```

2. build the build helper program (abstracts docker commands for easier development)

```
cd paramedics-web/build/builder
make optimal
```

3. build docker images and run containers

```
cd ../..
./builder -m dev -e build
./builder -m dev -e run
```

4. check that the containers are up and running

```
./builder -m dev -e status
```

this should show you something like this:
```
             Name                            Command               State               Ports
---------------------------------------------------------------------------------------------------------
paramedics-web_paramedics-api_1   docker-entrypoint.sh npm r ...   Up      0.0.0.0:4000->4000/tcp, 80/tcp
paramedics-web_paramedics-db_1    docker-entrypoint.sh postgres    Up      0.0.0.0:5432->5432/tcp
```

5. check that you can see the graphQL playground at `localhost:4000`
