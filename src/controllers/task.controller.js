import moment from "moment";

import db from "../models";
const Task = db.tasks;
const User = db.users;
const Customer = db.customer;
export const taskController = {
   create: async (req, res) => {
      // const { permissionName, description } = req.body;
      // try {
      //    const permission = {
      //       permissionName,
      //       description,
      //    };
      //    const result = await Task.create(permission);
      //    res.status(201).json(result);
      // } catch (error) {
      //    res.status(400).json({ msg: error.message });
      // }
      const {
         taskName,
         taskDescription,
         startTime,
         endTime,
         createdAt,
         updatedAt,
         customerId,
         userId,
         taskTypeId,
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
            ],
         });
         const date = new Date(tasks.startTime);
         const myTime = moment(tasks.startTime).format("DD MM YYYY hh:mm");
         console.log(myTime);
         console.log(moment(tasks.startTime).format("DD MM YYYY"));
         res.json(tasks);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
   update: async (req, res) => {},
   delete: async (req, res) => {},
   getAll: async (req, res) => {
      try {
         const tasks = await Task.findAll();
         res.json(tasks);
      } catch (error) {
         res.status(400).json({ msg: error.message });
      }
   },
};
