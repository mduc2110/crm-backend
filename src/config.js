import dotenv from "dotenv";
import path from "path";

let filename;
if (process.env.NODE_ENV === "production") filename = ".env";
else filename = ".env.dev";

const envPath = path.resolve(process.cwd(), filename);

const parsed = dotenv.config({
   path: envPath,
}).parsed;

const config = {};

Object.keys(parsed).forEach((key) => {
   config[key.toLowerCase()] = parsed[key];
});

export default config;
