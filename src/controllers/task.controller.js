import moment from "moment";

import db from "../models";
import { getPagination, getPagingData } from "../utils/pagination";
const Task = db.tasks;
const User = db.users;
const Customer = db.customer;
const TaskType = db.tasktypes;

const Op = db.Sequelize.Op;
const Sequelize = db.Sequelize;

const include = [
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
];

export const taskController = {
   create: async (req, res) => {
      const {
         taskName,
         taskDescription,
         startTime,
         endTime,
         customerId,
         userId,
         tasktypeId,
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
            tasktypeId,
            status: "PROCESSING",
         };
         const createdTask = await Task.create(task);
         const result = await Task.findByPk(createdTask.id, {
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
         return res.status(201).json(result);
      } catch (error) {
         console.log(error.message);
         return res.status(400).json({ msg: error.message });
      }
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
   update: async (req, res) => {
      const { id } = req.params;
      const {
         startTime,
         endTime,
         taskName,
         taskDescription,
         status,
         customerId,
         userId,
         tasktypeId,
      } = req.body;
      if (!id) {
         throw Error("Missing task id");
      }
      try {
         const task = await Task.findByPk(id, {
            include,
         });

         task.startTime = startTime;
         task.endTime = endTime;
         task.taskName = taskName;
         task.taskDescription = taskDescription;
         task.status = status;
         task.updatedAt = new Date();
         task.customerId = customerId;
         task.userId = userId;
         task.tasktypeId = tasktypeId;

         await task.save();

         const result = await Task.findByPk(id, {
            attributes: {
               exclude: ["userId", "customerId", "tasktypeId"],
            },
            include,
         });
         return res.status(200).json(result);
      } catch (error) {
         return res.status(400).json({ msg: error.message });
      }
   },
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
      const { from, to, status, page, limit, idType, userId, year } = req.query;
      const { size, offset } = getPagination(page, limit);
      const where = {};
      const staticCondition = {};
      // if (from) {
      //    where.createdAt = {
      //       [Op.gte]: new Date(from),
      //    };
      // } else if (to) {
      //    where.createdAt = {
      //       [Op.lte]: new Date(to),
      //    };
      // }
      try {
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
         if (userId) {
            where.userId = userId;
         }
         if (!year) {
            const tasks = await Task.findAndCountAll({
               where: where,
               attributes: {
                  exclude: ["userId", "customerId", "tasktypeId"],
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
         } else {
            staticCondition.createdAt = {
               [Op.and]: [Sequelize.where(Sequelize.fn("YEAR", Sequelize.col("createdAt")), year)],
            };
            const tasks = await Task.findAll({
               attributes: {
                  exclude: ["userId", "customerId", "tasktypeId"],
               },
               where: staticCondition,
               order: ["createdAt"],
            });
            const monthsIndex = new Array(11).fill(0);
            tasks.forEach((element) => {
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
