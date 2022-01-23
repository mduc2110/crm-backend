import { ExtractJwt } from "passport-jwt";
import JwtStrategy from "passport-jwt/lib/strategy";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { finder } from "../utils/addressHelper";
import db from "../models";
import config from "../config";

const User = db.users;
const Role = db.roles;
const Permission = db.permissions;

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
         const user = await User.findOne({
            where: { username: username },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
               model: Role,
               attributes: {
                  exclude: ["createdAt", "updatedAt", "asso_role_permissions", "id", "description"],
               },
               include: {
                  model: Permission,
                  attributes: {
                     exclude: ["createdAt", "updatedAt", "asso_role_permissions", "id", "description"],
                  },
                  through: { attributes: [] },
               },
            },
         });
         // return res.status(200).json(user);
         if (user) {
            delete user.password;
            const validPass = await bcrypt.compare(password, user.password);
            const permissionsList = user.role.permissions.map((object) => object.permissionName);
            if (validPass) {
               res.status(200).json({
                  message: "success",
                  user: {
                     id: user.id,
                     name: user.name,
                     emai: user.email,
                     permissions: permissionsList,
                  },
                  token:
                     "Bearer " +
                     jwt.sign(
                        {
                           username: user.username,
                           id: user.id,
                           permissions: permissionsList,
                           role: user.role.roleName,
                        },
                        config.token_secret,
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
      const { username, password, email, name, phone, roleId, active } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      if (!password) {
         return res.json({ message: "password is required" });
      }
      const hashed_password = bcrypt.hashSync(password, salt);
      // return res.json(hashed_password);
      try {
         const user = { username, password: hashed_password, email, name, roleId, phone, active };
         const response = await User.create(user);
         return res.json({ data: response });
      } catch (error) {
         return res.json({ msg: error.message });
      }
   },
   getAll: async (req, res) => {
      // console.log(finder.getProvinceName("thanh-pho-ha-noi"));
      console.log(finder.getProvinceName("thanh-pho-ha-noi"));
      console.log(finder.getDistrictName("thanh-pho-ho-chi-minh", "quan-tan-binh"));
      console.log(finder.getWardName("quan-tan-binh", "26989-0001"));
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
