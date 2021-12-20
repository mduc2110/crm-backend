import { ExtractJwt } from "passport-jwt";
import JwtStrategy from "passport-jwt/lib/strategy";
import passport from "passport";
import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const User = db.User;

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
// passport.use(
//    new JwtStrategy(opts, function (jwt_payload, done) {
//       console.log(jwt_payload);
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
      const { username, password } = req.body;
      try {
         const user = await User.findOne({ where: { username: username } });
         if (user) {
            delete user.password;
            const validPass = await bcrypt.compare(password, user.password);
            if (validPass) {
               res.status(200).json({
                  info: user,
                  token:
                     "Bearer " +
                     jwt.sign(
                        {
                           username: user.username,
                           id: user.id,
                        },
                        process.env.TOKEN_SECRET,
                        // { expiresIn: "12h" }
                        { expiresIn: 86400 }
                     ),
               });
            } else {
               res.status(400).json({ message: "invalid password" });
            }
         } else {
            res.status(400).json("Invalid username");
         }
      } catch (error) {
         return res.json({ msg: error.message });
      }
   },
   create: async (req, res) => {
      const { username, password, email, name } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      if (!password) {
         res.json({ message: "password is required" });
      }
      const hashed_password = bcrypt.hashSync(password, salt);
      try {
         const user = { username, password: hashed_password, email, name };
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
      return res.json(req.user); //by default if authenticate succcessfully req.user will be auto-set by passport (from jwt_payload)
   },
   update: async (req, res) => {
      // console.log(req);
      return res.json("OK");
   },
   delete: async (req, res) => {
      return res.json("OK");
   },
};
