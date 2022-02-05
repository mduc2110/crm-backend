import db from "../models";
import { getAddressData, validateAddressCode } from "../utils/addressHelper";
import xlsx from "xlsx";
import { excelDateFormater } from "../utils/excelDateFormater";
import { getPagination, getPagingData } from "../utils/pagination";

const Address = db.address;
const Customer = db.customer;
const CustomerStatus = db.customerStatus;
const CustomerTag = db.customerTag;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

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

         return res.status(201).json({
            id: createdCustomer.id,
            customerName: createdCustomer.customerName,
            phone: createdCustomer.phone,
            email: createdCustomer.email,
            birthday: createdCustomer.birthday,
            gender: createdCustomer.gender,
            personalID: createdCustomer.personalID,
            customerStatusId: createdCustomer.customerStatusId,
            customerTagId: createdCustomer.customerTagId,
            idProvince: createdCustomer.idProvince,
            idDistrict: createdCustomer.idDistrict,
            idWard: createdCustomer.idWard,
            detailAddress: createdCustomer.detailAddress,
         });
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         const customer = await Customer.findByPk(id, {
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
         console.log(customer.getBirthday());
         if (!customer) {
            throw Error("Customer not found!");
         }
         // const transformedCustomerData = Object.assign({}, customer.dataValues);
         // const { idProvince, idDistrict, idWard, detailAddress } = transformedCustomerData;

         // delete transformedCustomerData.idProvince;
         // delete transformedCustomerData.idDistrict;
         // delete transformedCustomerData.idWard;
         // delete transformedCustomerData.detailAddress;

         // const addressObject = getAddressData(idProvince, idDistrict, idWard, detailAddress);

         // transformedCustomerData.address = addressObject;
         const { idProvince, idDistrict, idWard, detailAddress } = customer.dataValues;

         const formattedCustomerObject = {
            ...customer.dataValues,
            address:
               idProvince && idDistrict && idWard && detailAddress
                  ? getAddressData(idProvince, idDistrict, idWard, detailAddress)
                  : {},
            // address: getAddressData(idProvince, idDistrict, idWard, detailAddress),
         };

         delete formattedCustomerObject.idProvince;
         delete formattedCustomerObject.idDistrict;
         delete formattedCustomerObject.idWard;
         delete formattedCustomerObject.detailAddress;

         return res.status(200).json(formattedCustomerObject);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   update: async (req, res) => {},
   delete: async (req, res) => {
      try {
         const { customerIdArray } = req.body;
         console.log(req.body.customerIdArray);
         if (!Array.isArray(customerIdArray)) {
            console.log("customerIdArray must be an array");
            return res.status(400).json({ msg: "customerIdArray must be an array" });
         }
         if (customerIdArray.length === 0) {
            console.log("customerIdArray array must have at least 1 id");
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
         return res.status(401).json({ msg: error.message });
      }
   },
   getAll: async (req, res) => {
      // const getPagination = (page, limit) => {
      //    const size = limit ? +limit : null;
      //    const offset = page && +page !== 0 ? (+page - 1) * limit : null;
      //    console.log(offset);
      //    return { size, offset };
      // };
      // const getPagingData = (data, page, limit) => {
      //    const { count: totalItems, rows: results } = data;
      //    const currentPage = page ? +page : 0;
      //    const totalPages = Math.ceil(totalItems / limit);

      //    return { totalItems, results, totalPages, currentPage };
      // };
      try {
         const { page, limit, q } = req.query;
         const condition = q ? { customerName: { [Op.like]: `%${q}%` } } : null;
         const { size, offset } = getPagination(page, limit);

         const customers = await Customer.findAndCountAll({
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
            where: condition,
            limit: size,
            offset: offset,
         });
         // getAddressData
         const customerTransformed = getPagingData(customers, page, limit);
         return res.json(customerTransformed);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   createCustomersWithExcelFiles: async (req, res) => {
      try {
         if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
         }

         let path = "./src/static/uploads/excelFiles/" + req.file.filename;
         // const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(path));
         var workbook = xlsx.readFile(path);
         var sheet_name_list = workbook.SheetNames;
         var xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
         const customersUpload = xlData.map((item) => {
            return {
               customerName: item["Tên khách hàng"],
               phone: item["Số điện thoại"],
               email: item["Email"],
               birthday: excelDateFormater(item["Ngày sinh"]),
               gender: item["Giới tính"],
               personalID: item["Căn cước công dân"],
               customerStatusId: 1,
               customerTagId: 1,
               idProvince: item["Thành phố"],
               idDistrict: item["Quận/Huyện"],
               idWard: item["Phường"],
               detailAddress: item["Địa chỉ chi tiết"],
            };
         });
         try {
            // const response = await Customer.bulkCreate(customersUpload);
            return res.status(201).json(customersUpload);
         } catch (error) {
            return res.status(400).json({ msg: error.message });
         }
      } catch (error) {
         // console.log(error);
         return res.status(400).json({ msg: error.message });
         // res.status(500).send({
         //    message: "Could not upload the file: " + req.file.originalname,
         // });
      }
   },
   test: (req, res) => {
      const idArray = req.body.idArray;
      return res.json(idArray);
   },
};
