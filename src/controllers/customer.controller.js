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
         if (!customer) {
            throw Error("Customer not found!");
         }
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
   delete: async (req, res) => {
      try {
         const { customerIdArray } = req.body;
         if (!Array.isArray(customerIdArray)) {
            return res.status(400).json({ msg: "customerIdArray must be an array" });
         }
         if (customerIdArray.length === 0) {
            return res.status(400).json({ msg: "customer id array must have at least 1 id" });
         }
         const result = await Customer.destroy({ where: { id: customerIdArray } });
         if (result === 0) {
            return res.status(200).json({ msg: `No customer has been deleted.` });
         }
         return res.status(200).json({
            msg: `${result} customer${result <= 1 ? "" : "s"} ha${
               result === 1 ? "s" : "ve"
            } been deleted `,
         });
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
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
   createCustomersWithExcelFiles: async (req, res) => {
      try {
         if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
         }
         let path = "./src/statics/uploads/excelFiles" + req.file.filename;

         // const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(path));
         var workbook = xlsx.readFile(path);
         var sheet_name_list = workbook.SheetNames;
         var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
         const tutorials = xlData.map((item) => {
            return {
               fullName: item["Tên khách hàng"],
               email: item["Email"],
               phone: item["Số điện thoại"],
               dob: formatDateFromXlsx(item["Ngày sinh"]),
            };
         });
         try {
            const response = await Customer.bulkCreate(tutorials);
            res.json(response);
         } catch (error) {
            res.json(error);
         }
      } catch (error) {
         console.log(error);
         res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
         });
      }
   },
};
