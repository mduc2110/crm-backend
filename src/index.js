import express from "express";
import routes from "./routes";
import db from "./models";
import passport from "passport";
import { ExtractJwt } from "passport-jwt/lib";
import JwtStrategy from "passport-jwt/lib/strategy";
import passportConfig from "./config/passport";
import config from "./config";
import cors from "cors";
import { Sequelize } from "sequelize";
const port = process.env.PORT || 5555;
const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(cors());
app.use("/static", express.static("./src/static"));

passportConfig(passport);

// const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
//    host: config.db_host,
//    dialect: config.dialect,
//    logging: false,
// });

// sequelize.sync({ alter: true }).catch((err) => {
//    console.log(err.message);
// });

const { dirname } = require("path");
const appDir = dirname(require.main.filename);
// console.log(appDir);
// console.log(__dirname);

try {
   db.sequelize.sync().catch((err) => {
      console.log(err.message);
      // throw err;
   });
} catch (error) {
   console.log(error.message);
}

app.use("/api", routes);

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.TOKEN_SECRET;
// passport.use(
//    new JwtStrategy(opts, (jwt_payload, done) => {
//       console.log(jwt_payload);
//       // done(null, jwt_payload);
//    })
// );

app.post("/hook", (req, res) => {
   var events = req.body;

   events.forEach(function (event) {
      // Here, you now have each event and can process them how you like
      // processEvent(event);
      console.log(event);
   });
   // return res.json("OK");
   return res.json(events);
});
app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
   res.json("OK");
});
// console.log(config);
app.listen(port, () => {
   console.log(`Server is running on ${config.port}`);
});
