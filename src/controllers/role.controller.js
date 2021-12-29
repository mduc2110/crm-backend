import db from "../../junctions";

const Role = db.Role;

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
   getOne: async (req, res) => {},
   update: async (req, res) => {},
   delete: async (req, res) => {},
   getAll: async (req, res) => {},
};
