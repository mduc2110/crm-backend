import db from "../models";
import { getAddressData, validateAddressCode } from "../utils/addressHelper";

const Address = db.address;
const Customer = db.customer;
const CustomerStatus = db.customerStatus;
const CustomerTag = db.customerTag;

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
         // const address = { idProvince, idDistrict, idWard, detailAddress };

         const { isValid, msg } = validateAddressCode(idProvince, idDistrict, idWard);
         if (!isValid) {
            throw Error(msg);
         }
         // const createdAddress = await Address.create(address);

         // const addressId = createdAddress.id;

         const customer = {
            customerName,
            phone,
            email,
            birthday,
            gender,
            personalID,
            customerStatusId: idStatus,
            customerTagId: idTag,
            idProvince,
            idDistrict,
            idWard,
            detailAddress,
         };

         const createdCustomer = await Customer.create(customer);

         return res.status(201).json(createdCustomer);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         const customer = await Customer.findOne({
            where: {
               id,
            },
            attributes: {
               exclude: ["createdAt", "updatedAt", "customerStatusId", "customerTagId"],
            },
            include: [
               {
                  model: CustomerTag,
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
               {
                  model: CustomerStatus,
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
            ],
         });
         const transformedCustomerData = Object.assign({}, customer.dataValues);
         const { idProvince, idDistrict, idWard, detailAddress } = transformedCustomerData;
         delete transformedCustomerData.idProvince;
         delete transformedCustomerData.idDistrict;
         delete transformedCustomerData.idWard;
         delete transformedCustomerData.detailAddress;
         const addressObject = getAddressData(idProvince, idDistrict, idWard, detailAddress);

         transformedCustomerData.address = addressObject;
         // delete transformedCustomerData.idDistrict;
         // const e = getAddressData(customer.idProvince, customer.idDistrict, customer.idWard);
         // return res.status(200).json(transformedCustomerData);
         return res.status(200).json(transformedCustomerData);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   update: async (req, res) => {},
   delete: async (req, res) => {},
   getAll: async (req, res) => {
      try {
         const customer = await Customer.findAll({
            attributes: {
               exclude: ["createdAt", "updatedAt", "customerStatusId", "customerTagId"],
            },
            include: [
               {
                  model: CustomerTag,
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
               {
                  model: CustomerStatus,
                  attributes: {
                     exclude: ["createdAt", "updatedAt"],
                  },
               },
            ],
         });
         // getAddressData
         res.json(customer);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
};
