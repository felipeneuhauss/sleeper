<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Environment Variables

This project uses the following environment variables with clear naming conventions:

### Port Configuration
- **`HTTP_API_PORT`**: Port for external HTTP API access (e.g., 3000, 3001, 3002)
- **`MICROSERVICE_TCP_PORT`**: Port for internal microservice communication via TCP (e.g., 4000, 4001)

### Service Communication
- **`AUTH_HOST`**: Hostname for auth service (e.g., 'auth')
- **`AUTH_PORT`**: TCP port for auth service communication (e.g., 4000)
- **`PAYMENTS_HOST`**: Hostname for payments service (e.g., 'payments')
- **`PAYMENTS_PORT`**: TCP port for payments service communication (e.g., 4001)

### Example Configuration
```bash
# Reservations Service
HTTP_API_PORT=3000
MICROSERVICE_TCP_PORT=4001

# Auth Service  
HTTP_API_PORT=3001
MICROSERVICE_TCP_PORT=4000

# Payments Service
HTTP_API_PORT=3002
MICROSERVICE_TCP_PORT=4001
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

### Google Artifact Deploy

Reservation
```
$ cd /Users/fnaraujo/Workspace/pocs/sleeper && docker build -t reservations -f apps/reservations/Dockerfile .
$ docker tag reservations europe-west3-docker.pkg.dev/sleeper-468902/reservations
$ docker tag reservations europe-west3-docker.pkg.dev/sleeper-468902/reservations/production
$ docker image push europe-west3-docker.pkg.dev/sleeper-468902/reservations/production
```
Auth
```
$ cd /Users/fnaraujo/Workspace/pocs/sleeper && docker build -t auth -f apps/auth/Dockerfile .
$ docker tag auth europe-west3-docker.pkg.dev/sleeper-468902/auth
$ docker tag auth europe-west3-docker.pkg.dev/sleeper-468902/auth/production
$ docker image push europe-west3-docker.pkg.dev/sleeper-468902/auth/production
```

```
$ cd /Users/fnaraujo/Workspace/pocs/sleeper && docker build -t payments -f apps/payments/Dockerfile .
$ docker tag payments europe-west3-docker.pkg.dev/sleeper-468902/payments
$ docker tag payments europe-west3-docker.pkg.dev/sleeper-468902/payments/production
$ docker image push europe-west3-docker.pkg.dev/sleeper-468902/payments/production
```

```
$ cd /Users/fnaraujo/Workspace/pocs/sleeper && docker build -t notifications -f apps/notifications/Dockerfile .
$ docker tag notifications europe-west3-docker.pkg.dev/sleeper-468902/notifications
$ docker tag notifications europe-west3-docker.pkg.dev/sleeper-468902/notifications/production
$ docker image push europe-west3-docker.pkg.dev/sleeper-468902/notifications/production
```