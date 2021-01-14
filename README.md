## Description 

Practice with microservices, the is a very basic networking and job finding application built with Docker, Nodejs, React and NestJS

## Running

```bash
$ docker-compose up
```

## Services

```bash
|------------------------------------------------------------------------------------------------------------|
| SERVER                | ./server                 | Serves client and handles requests to other services    |
|------------------------------------------------------------------------------------------------------------|
| API                   | ./services/api           | Manages general CRUD                                    |
|------------------------------------------------------------------------------------------------------------|
| AUTH                  | ./services/auth          | Handle Authentication                                   |
|------------------------------------------------------------------------------------------------------------|
| MESSAGING             | ./services/messaging     | Handles Messaging                                       |
|------------------------------------------------------------------------------------------------------------|
| NOTIFICATIONS         | ./services/notifications | Handles Notifications                                   |
|------------------------------------------------------------------------------------------------------------|
| STORAGE               | ./services/storage       | Handle and store uploads                                |
|------------------------------------------------------------------------------------------------------------|
```


## WARNING:

```bash
$ Repo has outdated dependecies, currently breaking during build
```
