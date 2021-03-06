import { ExtractJwt } from "passport-jwt";
import JwtStrategy from "passport-jwt/lib/strategy";
import passport from "passport";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { finder } from "../utils/addressHelper";
import db from "../models";
import config from "../config";
import { getPagination, getPagingData } from "../utils/pagination";

const User = db.users;
const Role = db.roles;
const Permission = db.permissions;
const Dept = db.depts;

const Op = db.Sequelize.Op;

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
const include = {
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
};

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
                  token_expire: Date.now() + config.token_expire * 1000,
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
                        { expiresIn: +config.token_expire }
                     ),
               });
            } else {
               res.status(400).json({ message: "invalid password" });
            }
         } else {
            res.status(400).json("Invalid username");
         }
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   create: async (req, res) => {
      const { username, password, confirmPassword, email, name, phone, roleId, deptId } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const user = await User.findOne({ where: { username: username } });
      if (user) {
         return res.status(400).json({ message: "T??n ????ng nh???p ???? ???????c s??? d???ng" });
      }
      if (!password) {
         return res.status(400).json({ message: "password is required" });
      }
      if (password !== confirmPassword) {
         return res.status(400).json({ message: "password does not match" });
      }
      const hashed_password = bcrypt.hashSync(password, salt);
      try {
         const user = {
            username,
            password: hashed_password,
            email,
            name,
            roleId,
            phone,
            active: true,
            deptId,
         };
         const createdUser = await User.create(user);
         const userData = await User.findByPk(createdUser.id, {
            attributes: {
               exclude: ["password", "deptId", "roleId", "createdAt", "updatedAt"],
            },
            include: [
               {
                  model: Dept,
                  attributes: ["id", "departmentName"],
               },
               {
                  model: Role,
                  attributes: ["id", "description"],
               },
            ],
         });
         return res.status(200).json(userData);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getAll: async (req, res) => {
      // console.log(finder.getProvinceName("thanh-pho-ha-noi"));
      // console.log(finder.getDistrictName("thanh-pho-ho-chi-minh", "quan-tan-binh"));
      // console.log(finder.getWardName("quan-tan-binh", "26989-0001"));
      const { from, to, page, limit, q } = req.query;
      const condition = q ? { name: { [Op.like]: `%${q}%` } } : {};
      const { size, offset } = getPagination(page, limit);
      // condition.username = { [Op.not]: "ADMIN" };

      const where = {};
      where.username = { [Op.not]: "ADMIN" };
      // where.createdAt = {
      //    [Op.lte]: new Date(to),
      // }
      if(from && to ) {
         where.createdAt = {
            [Op.between] : [new Date(from), new Date(to)],
         }
      }
      if(q) {
         where.name = { [Op.like]: `%${q}%` }
      }
      try {
         const user = await User.findAndCountAll({
            where: where,
            attributes: {
               exclude: ["password", "deptId", "roleId"],
            },
            include: [
               {
                  model: Dept,
                  attributes: ["id", "departmentName"],
               },
               {
                  model: Role,
                  attributes: ["id", "description"],
               },
            ],
            limit: size,
            offset: offset,
         });
         const userTransformed = getPagingData(user, page, limit);
         return res.status(200).json(userTransformed);
      } catch (error) {
         console.log(error.message);
         return res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         if (!id) {
            return res.status(400).json({ msg: "Id user is requried" });
         }
         const user = await User.findByPk(id, {
            attributes: {
               exclude: ["password", "deptId", "roleId"],
            },
            include: [
               {
                  model: Dept,
                  attributes: ["id", "departmentName"],
               },
               {
                  model: Role,
                  attributes: ["id", "description"],
               },
            ],
         });
         return res.json(user);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
      // return res.json(req.user); //by default if authenticate succcessfully req.user will be auto-set by passport (from jwt_payload)
   },
   update: async (req, res) => {
      let id;
      const {permission} = req;
      switch (permission) {
         case "MANAGER_WRITE":
            id = req.body.id;
            if (!id) {
               return res.status(400).json({id: "id field is required"});
            }
            break;
         case "USER_WRITE":
            id = req.user.id;
            break;
         default:
            id = req.user.id;
            break;
      }

      const { password, confirmPassword, email, name, phone, roleId, deptId } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      try {
         const user = await User.findByPk(id);

         if(password) {
            if(password !== confirmPassword) {
               return res.status(400).json({message: "M???t kh???u kh??ng tr??ng kh???p"});
            }
            const hashed_password = bcrypt.hashSync(password, salt);
            if(hashed_password === user.password) {
               
               return res.status(400).json({message: "B???n ???? nh???p m???t kh???u c??"});
            }
            user.password = hashed_password;

            await user.save();

            return res.status(200).json({message: "C???p nh???t m???t kh???u th??nh c??ng!"});
         }else {
            user.email = email;
            user.name = name;
            user.roleId = roleId;
            user.phone = phone;
            user.deptId = deptId;

            await user.save();

            const updatedUser = await User.findByPk(id, {
               attributes: {
                  exclude: ["password", "deptId", "roleId"],
               },
               include,
            });
            return res.status(200).json(updatedUser);
         }
      } catch (error) {
         return res.status(400).json({msg: error.message});
      }
   },
   delete: async (req, res) => {
      const { id } = req.params;
      try {
         const result = await User.destroy({ where: { id } });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },

   getAllDept: async (req, res) => {
      try {
         const condition = {};
         condition.departmentName = { [Op.not]: "ADMIN" };
         const result = await Dept.findAll({
            where: condition,
         });
         return res.status(200).json(result);
      } catch (error) {
         console.log({ msg: error.message });
         return res.status(400).json({ msg: error.message });
      }
   },
};
