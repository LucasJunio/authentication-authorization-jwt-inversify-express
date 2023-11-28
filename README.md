<h1 align="center">
     🐙 <a href="#" alt=""> Node.js Test Authenticatio/Authorization</a>
</h1>

<h3 align="center">
    🧪 Backend Test. 💚
</h3>

<h4 align="center">
	🚧   Development 🚀 🚧
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
- [3. Recommended Extensions](#3-recommended-extensions)

# 1. Overview

Authentication and authorization api

## 1.1. Stack

- [Typescript](https://www.typescriptlang.org/.docs/handbook/typescript-in-5-minutes.html)
- [Node](https://nodejs.org/en/about/) >= v16.13.1
- [GitHub](https://github.com/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/resources/what-container)

## 1.2. Auxiliary libs

- [Joi](https://joi.dev)
- [Prisma](https://www.prisma.io/)

# 2. 🔬 How To Run

## 2.1. Containers

```bash

# Clone this repository
$ git clone https://github.com/LucasJunio/authentication-authorization-jwt-inversify-express

# Acces the project folder in your terminal/cmd
$ cd authentication-authorization-jwt-inversify-express

# Copy base.env to .env
$ cp base.env .env

# Build the image docker
$ docker build -t auth .

# Run tests
$ docker run -e CI=true auth npm run test

# Build the container docker
$ docker run -p 3000:3000 auth

# Access SWAGGER documentation in:
http://localhost:3000/api

# The aplication going to open in  port:3000 - access http://localhost:3000

```

# 3. Recommended Extensions

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
