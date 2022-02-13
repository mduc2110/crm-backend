import dotenv from "dotenv";
import path from "path";

let filename;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") filename = ".env.dev";
else filename = ".env";

const envPath = path.resolve(process.cwd(), filename);

const parsed = dotenv.config({
   path: envPath,
}).parsed;

const config = {};

Object.keys(parsed).forEach((key) => {
   config[key.toLowerCase()] = parsed[key];
});

// config.node_env = process.env.NODE_ENV;
// config.db_host = process.env.DB_HOST;
// config.db_user = process.env.DB_USER;
// config.db_password = process.env.DB_PASSWORD;
// config.db_port = process.env.DB_PORT;
// config.db_name = process.env.DB_NAME;
// config.dialect = process.env.DIALECT;
// config.port = process.env.PORT;
// config.token_secret = process.env.TOKEN_SECRET;
// config.token_expire = process.env.TOKEN_EXPIRE;
// config.sendgrid_api_key = process.env.SENDGRID_API_KEY;

export default config;
