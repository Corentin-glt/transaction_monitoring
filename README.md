# Transaction Monitoring app 🚀

This is the Transaction Monitoring repository, before to start please to follow these steps.

---

## Init project 🔩

In order to use the project locally, we recommend to install the node LTS version.
Please to install yarn.

```sh
npm install --global yarn
```

Since the root directory please to install packages

```sh
yarn install
```

Once you've installed all packages, please to create you `.env` file on the root directory of the project. Then you can copy/paste the `.env.example` file into you `.env` file.
For the empty values, this is up to you.

Now, we recommend to use [Docker](https://www.docker.com/products/docker-desktop/) on your machine.
Then, please to launch the postgres DB by doing

```sh
docker compose up -d
```

You're almost done. In order to use the schema client from Prisma, you have to generate the prisma schema by doing:

```sh
yarn generate:prisma
```

then,

```sh
yarn migrate:prisma
```

If it's your first time using this project, you can face to an error saying that Prisma can't create a shadow database while migrating the prisma DB.
To resolve this please to run:

```sh
yarn dbpush:prisma
```

And it's done 🎉.

## Launch Services 🏁

In this NX monorepository, you will find multiple applications. The **client app** is built with **React**, and the **server app** is powered by **NestJS**.

### Start the Server (NestJS)

To launch the backend server, run the following command:

```sh
yarn start:server
```

This will start the NestJS server in development mode.

### Start the Client (React)

To launch the frontend application, run:

```sh
yarn start:client
```

This will start the React application in development mode and open it in your default browser.

Make sure all dependencies are installed by running `yarn install` before starting the services.
