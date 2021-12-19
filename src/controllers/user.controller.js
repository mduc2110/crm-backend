import { Strategy, ExtractJwt } from "passport-jwt";
import db from "../models";

const User = db.User;

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// passport.use(
//    new JwtStrategy(opts, function (jwt_payload, done) {
//       User.findOne({ id: 1 }, function (err, user) {
//          if (err) {
//             return done(err, false);
//          }
//          if (user) {
//             return done(null, user);
//          } else {
//             return done(null, false);
//             // or you could create a new account
//          }
//       });
//    })
// );

export const userController = {
   login: async (req, res) => {
      return res.json("OK");
   },
   create: async (req, res) => {
      const { username, password, email, name } = req.body;
      try {
         const user = { username, password, email, name };
         const response = await User.create(user);
         res.json({ res: response });
      } catch (error) {
         res.json({ msg: error.message });
      }
      return res.json("OK");
   },
   getAll: async (req, res) => {
      return res.json("OK");
   },
   getOne: async (req, res) => {
      return res.json("OK");
   },
   update: async (req, res) => {
      return res.json("OK");
   },
   delete: async (req, res) => {
      return res.json("OK");
   },
};
