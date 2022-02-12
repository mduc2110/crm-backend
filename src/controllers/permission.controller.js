import db from "../models";

const Permissions = db.permissions;
export const permissionController = {
   create: async (req, res) => {
      const { permissionName, description } = req.body;
      try {
         const permission = {
            permissionName,
            description,
         };
         const result = await Permissions.create(permission);
         res.status(201).json(result);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {},
   update: async (req, res) => {},
   delete: async (req, res) => {},
   getAll: async (req, res) => {
      try {
         const permissions = await Permissions.findAll({
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         });
         res.json(permissions);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
};
