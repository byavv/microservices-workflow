[![Circle CI](https://circleci.com/gh/byavv/mswf/tree/master.svg)](https://circleci.com/gh/byavv/mswf/tree/master)
## Microservices workflow (Node.js, Angular2, Seneca, Mosca, MQTT)

> Note! Angular 2 is in beta7

#### What we've got here

* Implementation of microservices architect for Node.js apps via [Seneca](http://senecajs.org/get-started/) and [Mosca](http://www.mosca.io/). The application is split up into a number of microservices, wrapped in docker containers.
* Angular 2 for frontend.
* Environment for testing and development microservices separately from others.

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
To tackle this, start microservice, you are working on via gulp or whatever, and microservices, it depends on - in their own containers. 
To rich microservices, running in containers, docker-compose exports http ports when they are started in dev mode (using default docker-compose.yml). 
So, you have to be sure 
that your containers are reachable for your "host" environment.

Start dependencies within containers:
```bush
docker-compose up mongo redis broker logger users
```
and (users microservice should be richable for host)
Move to microservice folder:
```bush
cd src/web
```
Install deps:
```bush
npm install 
#in case of web microservice
typings install
gulp build
```
Start default gulp task to watch you changes and automatically rebuild when changes occur:
```bush
gulp
```
## Testing
Each microservice can be tested separately. For now, unit tests only.
##Contribution
Feel free to contribute. This project is a playground and my first experience in microservices architect, 
so I would appreciate any new ideas.