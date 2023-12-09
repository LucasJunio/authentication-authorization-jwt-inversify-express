<h1 align="center">
     🐙 <a href="#" alt=""> Node.js Test Authenticatio/Authorization</a>
</h1>

<h3 align="center">
    🧪 Backend Test. 💚
</h3>

<h4 align="center">
	🚧   Finished 🚀 🚧
</h4>

### Prerequisites

Before you need install follow tools in your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [Docker](https://www.docker.com/resources/what-container).
Beyond is good to has an editor for to work with the code like [VSCode](https://code.visualstudio.com/)

# Summary

- [1. Overview](#1-overview)
  - [1.1 Stack](#11-stack)
  - [1.2. Auxiliary libs](#12-auxiliary-libs)
- [2. How To Run](#2-🔬-how-to-run)
  - [2.1 Containers](#21-containers)
  - [2.2 Local](#22-local)
  - [2.3 Evaluating Signin and Private Route](#23-evaluating)
  - [2.4 API Endpoints](#24-endpoints)
- [3. Prisma Local Database](#3-prisma-database)
- [4. How to create a new branch](#4-new-branch)
  - [4.1 Commits](#41-commits)
- [5. Software Architecture](#5-software-architecture)
- [6. Recommended Extensions](#6-recommended-extensions)

Prisma Local Database

# 1. Overview

Welcome to the Authentication and Authorization API! This API allows you to signin making authenticationa and authorization, receiving a token and a session cookie. This README provides instructions on how to set up and use the API. On this application you can see concepts like SOLID, EventEmitter, DRY, LOGS.

Result:

![API](.docs/gifs/main.gif)

## 1.1. Stack

- [Typescript](https://www.typescriptlang.org/.docs/handbook/typescript-in-5-minutes.html)
- [Node](https://nodejs.org/en/about/)
- [Docker](https://www.docker.com/resources/what-container)
- [Express](https://expressjs.com/)
- [Inversify](https://inversify.io/)
- [Prisma](https://www.prisma.io/)
- [GitHub](https://github.com/)

## 1.2. Auxiliary libs

- [Joi](https://joi.dev)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/)
- [Winston](https://www.npmjs.com/package/winston)

# 2. 🔬 How To Run

```bash

# Clone this repository
$ git clone https://github.com/LucasJunio/authentication-authorization-jwt-inversify-express

# Acces the project folder in your terminal/cmd
$ cd authentication-authorization-jwt-inversify-express

```

## 2.1. Containers

```bash

# Copy base.env to .env
$ cp base.env .env

# Build the image docker
$ docker build -t auth .

# Build the container docker
$ docker run -p 3001:3001 auth

# The aplication going to open in  port:3001 - access http://localhost:3001

```

## 2.2. Local

Run the development server local with &quot;yarn&quot;, &quot;npm&quot;, &quot;pnpm&quot; or manager package your preference:

```bash

# Create .env file
$ cp base.env .env

# Install dependencies
$ yarn install

# Generate the TypeScript code associated with your database models
$ npx prisma generate

# Building migrations
$ npx prisma migrate dev

# Building mock data
$ npx prisma db seed

# Run the project
$ yarn start

```

The aplication going to open in port:3001 - access [http://localhost:3001](http://localhost:3001)

### 2.3 Evaluating Signin and Private Route

You can login by sending a POST request to the `/api/v1/login` endpoint. Here's an example using cURL:

```bash

curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
  {
    "username": "user",
    "password": "123456"
  }
}' \
  http://localhost:3001/api/v1/login

```

The response will be a token.

You can evaluate the private route by sending a GET request to the `/api/v1/private-route` endpoint. Here's an example using cURL:

```bash
curl -X GET
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Cookie: session=YOUR_COOKIE_HERE" \
 http://localhost:3001/api/v1/private-route
```

The response will include the machine name and its health score.

### 2.4 API Endpoints

- `POST /private-route`: Checks if isAuthenticatedAndAuthorized middleware is working by getting session token and cookie.
- `POST /login`: Generate a token and ssesion.

# 3. Prisma Local Database

You can see the local database Prisma Studio is up on http://localhost:5555.

```bash

# Running local database
$ npx prisma studio

```

Result:

![Prisma Local Database](.docs/gifs/prisma-database.gif)

# 4. How to create a new branch

Ever that's necessary to create a new branch feature, create by [main]branch, implement your development, merge this feature/branch to develop, when all it's ok, give a merge of this feature/branch to main[branch].

Let's go to follow the git flow patterns to create a new branch, to more info browse in link below to learn more how to implement in simple way.

Workflow gitflow: https://www.atlassian.com/br/git/tutorials/comparing-workflows/gitflow-workflow

```bash

# Example creating a new branch
$ git checkout -b feature/TASK-1

```

## 4.1. Commits

For commit your changes, you can follow the suggestion to use conventional commits [https://www.conventionalcommits.org/en/v1.0.0/] for to improve your commit descriptions and help the understand of the team. Exist a extension in vscode that can help you with this mission.

vscode extension id in .vscode/extensions.json:

"recommendations": ["vivaxy.vscode-conventional-commits"]

# 5. Software Architecture

Main folder tree.

C:.

- src
- ├───constants
- ├───core
- ├───middleware
- ├───modules
- │ ├───controllers
- │ ├───dtos
- │ ├───inputs
- │ ├───interfaces
- │ ├───repositories
- │ ├───services
- │ └───validators
- └───util

# 6. Recommended Extensions

You can check out a list of recommended extensions in the file `.vscode/extensions.json`, or by opening the "Extensions" Tab in the "Recommended" pane.

---

## 🦸 Author

<a href="https://madaztec.com/">
 <img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/20959222?s=460&u=18b10f7fb7d2aca87ee0589d1825e754c67d222b&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Lucas Junio</b></sub></a> <a href="https://madaztec.com/" title="Madaztec">🚀</a>
 <br />

---

## 📝 Licence

Made with ❤️ by Lucas Junio 👋🏽 [Contact](https://www.linkedin.com/in/lucas-junio/)
