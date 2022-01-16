import db from "../models";
import { validateAddressCode } from "../utils/addressCodeFinder";

const Address = db.address;
const Customer = db.customer;

export const customerController = {
   create: async (req, res) => {
      const { customerName, phone, email, birthday, gender, personalID, idStatus, idTag, idProvince, idDistrict, idWard, detailAddress } = req.body;
      try {
         // const address = { idProvince, idDistrict, idWard, detailAddress };

         const { isValid, msg } = validateAddressCode(idProvince, idDistrict, idWard);
         if (!isValid) {
            throw Error(msg);
         }
         // const createdAddress = await Address.create(address);

         // const addressId = createdAddress.id;

         const customer = { customerName, phone, email, birthday, gender, personalID, customerStatusId: idStatus, customerTagId: idTag, idProvince, idDistrict, idWard, detailAddress };

         const createdCustomer = await Customer.create(customer);

         return res.status(201).json(createdCustomer);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         const customer = await Customer.findByPk(id);
         return res.status(200).json(customer);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
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
