import moment from "moment";

import db from "../models";
import { getPagination, getPagingData } from "../utils/pagination";
const Task = db.tasks;
const User = db.users;
const Customer = db.customer;
const TaskType = db.tasktypes;

const Op = db.Sequelize.Op;

export const taskController = {
   create: async (req, res) => {
      const {
         taskName,
         taskDescription,
         startTime,
         endTime,
         customerId,
         userId,
         taskTypeId,
         // status,
      } = req.body;
      try {
         const task = {
            taskName,
            taskDescription,
            startTime,
            endTime,
            customerId,
            userId,
            taskTypeId,
            status: "PROCESSING",
         };
         const result = await Task.create(task);
         res.status(201).json(result);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
      return res.json("OK");
   },
   getOne: async (req, res) => {
      const { id } = req.params;
      try {
         const tasks = await Task.findOne({
            where: {
               id,
            },
            include: [
               {
                  model: User,
                  attributes: ["id", "name"],
               },
               {
                  model: Customer,
                  attributes: ["customerName", "id"],
               },
               {
                  model: TaskType,
                  attributes: ["nameType", "id"],
               },
            ],
         });
         // const date = new Date(tasks.startTime);
         // const myTime = moment(tasks.startTime).format("DD MM YYYY hh:mm");
         // console.log(myTime);
         // console.log(moment(tasks.startTime).format("DD MM YYYY"));
         res.json(tasks);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   update: async (req, res) => {},
   delete: async (req, res) => {
      const { id } = req.params;
      try {
         const result = await Task.destroy({ where: { id } });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(401).json({ msg: error.message });
      }
   },
   getAll: async (req, res) => {
      const { from, to, status, page, limit, idType } = req.query;
      const { size, offset } = getPagination(page, limit);
      const where = {};
      // if (from) {
      //    where.createdAt = {
      //       [Op.gte]: new Date(from),
      //    };
      // } else if (to) {
      //    where.createdAt = {
      //       [Op.lte]: new Date(to),
      //    };
      // }
      if (from && to) {
         where.createdAt = {
            [Op.between]: [new Date(from), new Date(to)],
         };
      }
      if (status) {
         where.status = status;
      }
      if (idType) {
         where.taskTypeId = idType;
      }
      try {
         const tasks = await Task.findAndCountAll({
            where: where,
            attributes: {
               exclude: ["userId", "customerId", "taskTypeId"],
            },
            include: [
               {
                  model: User,
                  attributes: ["id", "name"],
               },
               {
                  model: Customer,
                  attributes: ["customerName", "id"],
               },
               {
                  model: TaskType,
                  attributes: ["nameType", "id"],
               },
            ],

            limit: size,
            offset: offset,
            // where: {
            //    createdAt: {
            //       // [Op.between]: [startDate && new Date(startDate), new Date(endDate)],
            //       // [Op.between]: ["2022-02-02T11:57:59.000Z", "2022-02-02T11:57:59.000Z"],
            //       [Op.gte]: new Date(startDate),
            //       [Op.lte]: new Date(endDate),
            //    },
            //    // status: status ? status : null,
            // },
         });
         const taskTransformed = getPagingData(tasks, page, limit);
         return res.status(200).json(taskTransformed);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
   getType: async (req, res) => {
      try {
         const taskTypes = await TaskType.findAll({
            attributes: {
               exclude: ["createdAt", "updatedAt"],
            },
         });
         return res.status(200).json(taskTypes);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
};
