import db from "../models";

const CustomerStatus = db.customerstatus;
const CustomerTag = db.customertag;

export const customerTagController = {
   getAll: async (req, res) => {
      try {
         const tags = await CustomerTag.findAll({
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         });
         return res.status(200).json(tags);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getAllStatus: async (req, res) => {
      try {
         const tags = await CustomerStatus.findAll({
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         });
         return res.status(200).json(tags);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
};
