# CRM API

<!-- ## SETUP BABEL -->

<!-- npm install --save-dev babel-cli babel-preset-env babel-preset-es2015 babel-preset-stage-2 nodemon

touch .babelrc
{
"presets": ["env", "stage-2", "es2015"]
}

add this to package.json

"start": "nodemon ./server.js --exec babel-node -e js" -->

This project suppose for integration that between `Delivery master` and each `Shipper's API`.

## Basic environment

This project developed under the below environment.

-  mysql
   -  ORM : sequelize
-  Node.js
   -  Version : v14.15.1
   -  OSX x86
-  Express
-  Javascript ES6 & ES5 & Common
   -  Babel
-  Authentication
   -  passport
   -  jsonwebtoken
-  pm2 : process management

## Clone

```bash
git clone https://github.com/mduc2110/crm-backend.git
```

## Install

Install npm packages for this project.

```bash
# rm -rf node_modules
npm install && npm audit fix
```

## Main configuration by `.env` and `.env.dev`

Main configuration of the server that name as each environments.<br>
Also always must be placed root of project directory.

-  For the production(NODE_ENV=production): .env
-  Any other else(NODE_ENV=development) : .env.dev

And the file must have the required value for the mandatory parameter for the server like below.

## NODE_ENV

Make sure what the enviroment you will running. For exmaple below :

```bash
export NODE_ENV=production
export NODE_ENV=development
```

| Name of element  | Description                                                            |
| :--------------: | :--------------------------------------------------------------------- |
|       PORT       | What's number of port to listen on server. (e.g., LISTENPORT=8080 )    |
|     DIALECT      | DB Dialect (e.g., DIALECT=mysql )                                      |
|     DB_HOST      | The name of host to connect DB. (e.g., DB_HOST=localhost )             |
|     DB_NAME      | The name of database to access tables. (e.g., DB_NAME=crm_db )         |
|     DB_USER      | The username of db to access DB. (e.g., DB_USER=root )                 |
|   DB_PASSWORD    | The password of db to access DB. (e.g., DB_PASSWORD=123123 )           |
|     DB_PORT      | Port of db to access DB. (e.g., DB_PASSWORD=3306 )                     |
|   TOKEN_SECRET   | Jwt token authentication. (e.g., TOKEN_SECRET=QEBAQUAA4GNADCBiQKBgQC ) |
|   TOKEN_EXPIRE   | Jwt token expire. (e.g., TOKEN_EXPIRE=43200 )                          |
| SENDGRID_API_KEY | Api key creds for sending email                                        |

## RUN DEV

Run with dev environment (using nodemon)

```bash
npm run dev
```

## Build project

Build project

```bash
npm run build
```

After built please moving the ./src/static to the ./dist/src/static because npm run build does not compile the json file.

```bash
sudo cp -R ./src/static ./dist/src/static
```

## Start server

```bash
npm start
```

## Running with PM2

```bash
pm2 start ./dist/drc/index.js
```
