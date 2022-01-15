import db from "../models";
import { isValidProvinceCode } from "../utils/addressCodeFinder";

const Address = db.address;
const Customer = db.customer;

export const customerController = {
   create: async (req, res) => {
      const {
         customerName,
         phone,
         email,
         birthday,
         gender,
         personalID,
         idStatus,
         idTag,
         idProvince,
         idDistrict,
         idWard,
         detailAddress,
      } = req.body;
      try {
         const address = { idProvince, idDistrict, idWard, detailAddress };
         // const result = await Address.create(address);
         // console.log(isValidProvinceCode(address.idProvince));
         console.log(isValidProvinceCode(address.idProvince));
         // const result = await Address.create(address);
         // return res.status(201).json(result);
         return res.status(201).json({ ok: "ok" });
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {},
   update: async (req, res) => {},
   delete: async (req, res) => {},
   getAll: async (req, res) => {
      try {
         const customer = await Customer.findAll();
         res.json(customer);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
};
