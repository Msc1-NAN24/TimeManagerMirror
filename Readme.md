# TIME MANAGER

<a href="https://www.phoenixframework.org/" alt="PHOENIX">
        <img src="https://img.shields.io/badge/MADE%20WITH-Phoenix-blue" /></a>
<a href="https://www.docker.com/" alt="DOCKER">
        <img src="https://img.shields.io/badge/MADE%20WITH-Docker-brown" /></a>
<a href="https://vuejs.org/" alt="VUEJS">
        <img src="https://img.shields.io/badge/MADE%20WITH-VueJS-green" /></a>
<a href="https://www.postgresql.org/" alt="POSTGRESQL">
        <img src="https://img.shields.io/badge/MADE%20WITH-PostgreSQL-orange" /></a>

> This project is an EPITECH Project. If you are an EPITECH student, move out the way! Nothing to see here... The groups don't want to be involved to your -42.
> If you're not, no worries! You're welcome here!

[![Deploy](https://github.com/TimeManager-NAN3/TimeManagerMirror/actions/workflows/deploy.yml/badge.svg)](https://github.com/TimeManager-NAN3/TimeManagerMirror/actions/workflows/deploy.yml)
[![Build](https://github.com/TimeManager-NAN3/TimeManagerMirror/actions/workflows/build.yml/badge.svg)](https://github.com/TimeManager-NAN3/TimeManagerMirror/actions/workflows/build.yml)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&style=plastic&up_color=green&up_message=online&url=https%3A%2F%2Ftime-manager.tech%2F)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&label=api&up_color=green&up_message=online&url=https%3A%2F%2Fapi.time-manager.tech%2Fapi%2Fstatus)

## Project

The goal is to create an application of time management in 7 steps :

1. API
2. Frontend
3. DevOps
4. Design Thinking
5. Authentification
6. Mobile
7. Security

### Mockup on Figma

[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/wYBTJmu62lzp90DoSrea4a/Untitled?node-id=0%3A1)

## Implemented routes

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Time%20Manager%20API&uri=https://raw.githubusercontent.com/TimeManager-NAN3/TimeManagerMirror/develop/Insomnia_api.json)

## Global Deployment

For the deployment, a CI/CD pipeline is used. At each push on the main branch, the pipeline will be triggered. It will build the project and deploy it on the server. You can see the status of the pipeline on the top of this README. If the status is green, the project is deployed and you can access it on [time-manager.tech](https://time-manager.tech/).

## Local Deployment

### Prerequisites

Before installation, you need to create a .env file at the root of the repository likes the `/.env.example`
Moreover, you need Docker and Docker Compose installed on your machine.

### Docker:

A docker compose file is present to creates all needed services for the time manager.
It is composed of several services:

- Postgres DB
- Adminer (DB Inspector)
- Front (VueJS App)
- Api (Elixir/Phoenix Api)
- Nginx

```shell
$ docker compose up # with a version of docker compose below v1
$ docker-compose up # with docker compose v2
```

## Implemented routes

OpenAPI documentation is available on ....

## Authors

- **Nicolas SANS** - [frnikho](https://github.com/frnikho)
- **Maël QUEAU** - [mael-queau](https://github.com/mael-queau)
- **Elie MORICEAU** - [eliemoriceau](https://github.com/eliemoriceau)
- **Valentin BOUCHET** - [valentinbouchet](https://github.com/valentinbouchet)
