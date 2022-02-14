import express from "express";
import db from "../models";
const router = express.Router();
const Email = db.emails;
router.post("/sendgrid", async (req, res) => {
   var events = req.body;

   const email = {
      smtp_id: "",
      sg_message_id: "",
      event: "",
      email: "",
   };

   const exampleStmpId = "<14c5d75ce93.dfd.64b469@ismtpd-555>";

   let isCreate = true;

   events.forEach(function (event) {
      console.log(event);
      if (!event["smtp-id"]) {
         isCreate = false;
      } else {
         email.smtp_id = event["smtp-id"];
      }
      email.sg_message_id = event["sg_message_id"];
      email.event = event["event"];
      email.email = event["email"];
   });

   if (email.smtp_id !== exampleStmpId) {
      if (isCreate) {
         await Email.create(email);
      } else {
         //update event
         const queryResult = await Email.findOne({
            where: {
               sg_message_id: email.sg_message_id,
            },
         });
         queryResult.event = email.event;
         queryResult.updatedAt = new Date();

         await queryResult.save();
      }
   }
   console.log("-------------" + Date.now());
   return res.json(events);
});

export default router;
