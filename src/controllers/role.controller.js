import db from "../models";

const Role = db.roles;
const Permission = db.permissions;
const RolePermission = db.asso_role_permissions;
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

         condition.roleName = { [Op.not]: "ADMIN" };
         const result = await Role.findAll({
            where: condition,
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getPermissionWithRoleId: async (req, res) => {
      try {
         const { id } = req.params;
         const result = await RolePermission.findAll({
            where: { roleId: id },
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
            include: {
               model: Permission,
            },
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getAllPermision: async (req, res) => {
      try {
         const result = await Permission.findAll({
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   updatePermissionForRole: async (req, res) => {
      const { roleId, permissionsList } = req.body;
      try {
         if (!Array.isArray(permissionsList)) {
            return res.status(400).json({ msg: "Permission must be array" });
         }
         if (permissionsList.length <= 0) {
            return res.status(400).json({ msg: "Invalid Permission" });
         }
         if (!roleId) {
            return res.status(400).json({ msg: "RoleId is required" });
         }
         const bulkData = permissionsList.map((item) => {
            return { permissionId: item, roleId };
         });
         const deletedPermission = await RolePermission.destroy({ where: { roleId: roleId } });
         //delete before create
         const result = await RolePermission.bulkCreate(bulkData);
         return res.status(200).json(result);
      } catch (error) {
         console.log(error.message);
         return res.status(400).json({ msg: error.message });
      }
   },
};
