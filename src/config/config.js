const fs = require("fs");
import config from "../config";
// const config = require("../config");
// console.log(config);
module.exports = {
   development: {
      username: config.db_user,
      password: config.db_password,
      database: config.db_name,
      host: config.db_host,
      port: config.db_port,
      dialect: config.dialect,

      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      // host: process.env.DB_HOST,
      // port: process.env.DB_PORT,
      // dialect: process.env.DIALECT,

      // username: "root",
      // password: "123456",
      // database: "crm_db",
      // host: "localhost",
      // port: 3306,
      // dialect: "mysql",
      dialectOptions: {
         bigNumberStrings: true,
      },
      logging: false,
      timezone: "+07:00",
   },
   test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: process.env.DIALECT,
      port: 3306,
      dialect: "mysql",
      dialectOptions: {
         bigNumberStrings: true,
      },
   },
   production: {
      // username: process.env.PROD_DB_USERNAME,
      // password: process.env.PROD_DB_PASSWORD,
      // database: process.env.PROD_DB_NAME,
      // host: process.env.PROD_DB_HOSTNAME,
      // port: process.env.PROD_DB_PORT,
      // dialect: "mysql",
      username: config.prod_db_user,
      password: config.prod_db_password,
      database: config.prod_db_name,
      host: config.prod_db_host,
      port: config.prod_db_port,
      dialect: config.prod_dialect,

      dialectOptions: {
         bigNumberStrings: true,
         // ssl: {
         //    ca: fs.readFileSync(__dirname + "/mysql-ca-main.crt"),
         // },
      },
      timezone: "+07:00",
   },
};
