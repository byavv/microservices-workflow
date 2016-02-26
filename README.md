[![Circle CI](https://circleci.com/gh/byavv/mswf/tree/master.svg)](https://circleci.com/gh/byavv/mswf/tree/master)
## Microservises workflow (Node.js, Angular2, Seneca, Mosca)

> Note! Angular 2 is in beta7

#### What we've got here

* Implementation of microservices architect for Node.js apps via Seneca and Mosca. The application is split up into a number of microservices, wrapped in docker containers, each with its own concern.
* Angular 2 (only because it's my way to write frontend).
* Environment for testing and development microservices separately from others

## Requirements
* [Docker](https://docs.docker.com/linux/step_one/)
* [Docker-compose](https://docs.docker.com/compose/install/)

## Quick start
install globals:
```bash
npm install -g gulp mocha
```
buld containers:
```bash
docker-compose build
```
Have a cup of coffee... or two, it is a long process, then:
```bash
docker-compose up
```
Go to [localhost:3030](localhost:3030)

## Development
Every application component (microservice) is launched in its own container. It's a big overhead to build container every time you make changes.
To tackle this, start microservice, you are working on via gulp or whatever, and microservices, it depends
on - in their own containers. To rich microservices, running in containers, there are ports, exported when they are established via docker-compose. 
So, you have to be sure that your containers are reachable for your "host" environment.

start dependencies within containers
```bush
docker-compose up mongo redis broker logger users
```
and (users microservice should be richable for host)
move to the folder
```bush
cd src/web
```
install deps
```bush
npm install
```
start default gulp task to watch you changes and automatically rebuild when changes occur
```bush
gulp
```