const fs = require("fs");
import config from "../config";
module.exports = {
   development: {
      username: config.db_user,
      password: config.db_password,
      database: config.db_name,
      host: config.db_host,
      port: config.db_port,
      dialect: config.dialect,
      dialectOptions: {
         bigNumberStrings: true,
      },
      logging: false,
      timezone: "+07:00",
   },
   test: {
      username: process.env.CI_DB_USERNAME,
      password: process.env.CI_DB_PASSWORD,
      database: process.env.CI_DB_NAME,
      host: "127.0.0.1",
      port: 3306,
      dialect: "mysql",
      dialectOptions: {
         bigNumberStrings: true,
      },
   },
   production: {
      username: process.env.PROD_DB_USERNAME,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      host: process.env.PROD_DB_HOSTNAME,
      port: process.env.PROD_DB_PORT,
      dialect: "mysql",
      dialectOptions: {
         bigNumberStrings: true,
         ssl: {
            ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
         },
      },
   },
};
