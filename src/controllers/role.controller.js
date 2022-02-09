import db from "../models";

const Role = db.roles;
const Permission = db.permissions;
const Op = db.Sequelize.Op;

export const roleController = {
   create: async (req, res) => {
      const { name, description } = req.body;
      try {
         const role = { name, description };
         await Role.create(role);
         return res.status(201).json("Create role Successfully!!");
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      if (!id) {
         res.status(400).json({ msg: "Invalid ID" });
      }
      try {
         const result = await Role.findOne({
            where: {
               id: id,
            },
            attributes: { exclude: ["createdAt", "updatedAt"] },
            include: {
               model: Permission,
               attributes: { exclude: ["createdAt", "updatedAt", "asso_role_permissions"] },
               through: { attributes: [] },
            },
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   update: async (req, res) => {},
   delete: async (req, res) => {},
   getAll: async (req, res) => {
      try {
         const { page, limit, q } = req.query;
         const condition = q ? { description: { [Op.like]: `%${q}%` } } : {};
         const result = await Role.findAll({
            where: condition,
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
};
