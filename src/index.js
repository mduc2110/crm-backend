import express from "express";
import routes from "./routes";
import db from "./models";
// import passport from "passport";
import { ExtractJwt } from "passport-jwt/lib";
import JwtStrategy from "passport-jwt/lib/strategy";
import passportConfig from "./config/passport";

const port = process.env.PORT || 5555;
const app = express();

app.use(express.json());
// app.use(passport.initialize());

// passportConfig(passport);

db.sequelize.sync({ alter: true }).catch((err) => {
   console.log(err.message);
});

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

// app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
//    res.json("OK");
// });

app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});
