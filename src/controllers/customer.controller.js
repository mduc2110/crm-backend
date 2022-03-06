import db from "../models";
import {
   getAddressData,
   getDistrictCode,
   getProvinceCode,
   getWardCode,
   validateAddressCode,
} from "../utils/addressHelper";
import xlsx from "xlsx";
import { excelDateFormater } from "../utils/excelDateFormater";
import { getPagination, getPagingData } from "../utils/pagination";

const Address = db.address;
const Customer = db.customer;
const CustomerStatus = db.customerstatus;
const CustomerTag = db.customertag;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;

const include = [
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
];

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
            customerstatusId: idStatus,
            customertagId: idTag,
            idProvince,
            idDistrict,
            idWard,
            detailAddress,
         };

         const createdCustomer = await Customer.create(customer);
         const customerData = await Customer.findByPk(createdCustomer.id, {
            attributes: {
               exclude: ["createdAt", "updatedAt", "customerstatusId", "customertagId"],
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
         return res.status(201).json(customerData);
         // return res.status(201).json({
         //    id: createdCustomer.id,
         //    customerName: createdCustomer.customerName,
         //    phone: createdCustomer.phone,
         //    email: createdCustomer.email,
         //    birthday: createdCustomer.birthday,
         //    gender: createdCustomer.gender,
         //    personalID: createdCustomer.personalID,
         //    customerttatusId: createdCustomer.customerStatusId,
         //    customertagId: createdCustomer.customerTagId,
         //    idProvince: createdCustomer.idProvince,
         //    idDistrict: createdCustomer.idDistrict,
         //    idWard: createdCustomer.idWard,
         //    detailAddress: createdCustomer.detailAddress,
         // });
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         const customer = await Customer.findByPk(id, {
            attributes: {
               exclude: ["createdAt", "updatedAt", "customerstatusId", "customertagId"],
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
            address: getAddressData(idProvince, idDistrict, idWard, detailAddress),
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
   update: async (req, res) => {
      const { id } = req.params;
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
         const customer = await Customer.findByPk(id);

         customer.customerName = customerName;
         customer.phone = phone;
         customer.email = email;
         customer.birthday = birthday;
         customer.gender = gender;
         customer.personalID = personalID;
         customer.customerstatusId = idStatus;
         customer.customertagId = idTag;
         customer.idProvince = idProvince;
         customer.idDistrict = idDistrict;
         customer.idWard = idWard;
         customer.detailAddress = detailAddress;
         // const customer = await Customer.findAll({
         //    where: {
         //       id: [81, 82, 83],
         //    },
         // });
         await customer.save();

         const result = await Customer.findByPk(id, {
            include,
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
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
         return res.status(401).json({ msg: error.message });
      }
   },
   getAll: async (req, res) => {
      try {
         const { from, to, page, limit, q, year } = req.query;
         const condition = q ? { customerName: { [Op.like]: `%${q}%` } } : null;
         const { size, offset } = getPagination(page, limit);

         const where = {};
         const staticCondition = {};
         if (from && to) {
            where.createdAt = {
               [Op.between]: [new Date(from), new Date(to)],
            };
         }
         if (q) {
            where.customerName = { [Op.like]: `%${q}%` };
         }

         if (!year) {
            const customers = await Customer.findAndCountAll({
               attributes: {
                  exclude: ["createdAt", "updatedAt", "customerstatusId", "customertagId"],
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
               where: where,
               limit: size,
               offset: offset,
               order: [["createdAt", "DESC"]],
            });
            const customerTransformed = getPagingData(customers, page, limit);
            return res.json(customerTransformed);
         } else {
            // staticCondition[Op.and] = [
            //    Sequelize.where(Sequelize.fn("YEAR", Sequelize.col("createdAt")), year),
            // ];
            staticCondition.createdAt = {
               [Op.and]: [Sequelize.where(Sequelize.fn("YEAR", Sequelize.col("createdAt")), year)],
            };

            const customers = await Customer.findAll({
               attributes: {
                  exclude: ["updatedAt", "customerstatusId", "customertagId"],
               },
               where: staticCondition,
               limit: size,
               offset: offset,
               order: ["createdAt"],
            });
            const monthsIndex = new Array(11).fill(0);
            customers.forEach((element) => {
               const monthElementIndex = new Date(element.createdAt).getMonth();
               monthsIndex[monthElementIndex] += 1;
            });
            const result = {
               year: year,
               monthsIndex: monthsIndex,
            };
            return res.json(result);
         }
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
            // console.log(getDistrictCode(item["Quận/Huyện"]));
            const provinceCode = getProvinceCode(item["Thành phố"]);
            const districtCode = getDistrictCode(item["Quận/Huyện"]);
            const wardCode = getWardCode(item["Phường"], districtCode);
            return {
               customerName: item["Tên khách hàng"],
               phone: item["Số điện thoại"],
               email: item["Email"],
               birthday: excelDateFormater(item["Ngày sinh"]),
               // gender: "1999-10-21",
               gender: item["Giới tính"],
               personalID: item["Căn cước công dân"],
               customerstatusId: 1,
               customertagId: 1,
               idProvince: provinceCode,
               idDistrict: districtCode,
               idWard: wardCode,
               detailAddress: item["Địa chỉ chi tiết"],
            };
         });

         try {
            const response = await Customer.bulkCreate(customersUpload);
            const idList = response.map((customer) => customer.id);
            const customers = await Customer.findAll({
               where: {
                  id: idList,
               },
               attributes: {
                  exclude: ["createdAt", "updatedAt", "customerstatusId", "customertagId"],
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

            return res.status(201).json(customers);
            // return res.status(201).json(customersUpload);
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
   downloadSample: (req, res) => {
      const file = "src/static/assets/Excel template.xlsx";
      res.download(file);
   },
   test: (req, res) => {
      const idArray = req.body.idArray;
      return res.json(idArray);
   },
};
