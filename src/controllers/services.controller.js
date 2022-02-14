import sgMail from "@sendgrid/mail";
import config from "../config";
import db from "../models";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const Email = db.emails;

export const servicesController = {
   sendEmail: async (req, res) => {
      const { email, subject, text, html } = req.body;
      let filteredEmailList = [];
      if (Array.isArray(email)) {
         filteredEmailList = email.filter((item, index) => email.indexOf(item) === index);
      } else {
         return res.status(400).json({ msg: "email must be an array!" });
      }
      const receivers = filteredEmailList.map((item) => {
         return {
            email: item,
         };
      });
      const msg = {
         personalizations: [
            {
               to: receivers,
            },
         ],
         from: "vmd211099@gmail.com", // Use the email address or domain you verified above
         subject: subject,
         text: text,
         html: html,
      };
      try {
         const result = await sgMail.send(msg);
         console.log(result);
         return res.status(200).json({ msg: result });
      } catch (error) {
         return res.status(200).json({ msg: error.message });
      }
   },
   getAll: async (req, res) => {
      try {
         const result = await Email.findAll();
         let emailList = result.map((item, index) => item.email);

         const filteredList = emailList.filter((item, index) => emailList.indexOf(item) === index);

         return res.json(filteredList);
      } catch (error) {
         return res.status(400).json({ err: error.message });
      }
   },
   getOne: async (req, res) => {
      const { email } = req.params;
      const statusCount = {
         processed: 0,
         deferred: 0,
         delivered: 0,
         open: 0,
         click: 0,
         bounce: 0,
         dropped: 0,
         spamreport: 0,
         unsubscribe: 0,
         group_unsubscribe: 0,
         group_resubscribe: 0,
      };
      // console.log(statusCount[]);
      try {
         const result = await Email.findAll({
            where: {
               email,
            },
         });
         result.forEach((element) => {
            const event = element.event;
            statusCount[event] = 1 + statusCount[event];
         });
         return res.json(statusCount);
      } catch (error) {
         return res.status(400).json({ err: error.message });
      }
   },
};
