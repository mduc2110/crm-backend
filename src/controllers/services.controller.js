import sgMail from "@sendgrid/mail";
import config from "../config";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const servicesController = {
   sendEmail: async (req, res) => {
      const msg = {
         to: req.body.email,
         from: "lol.mduc1999@gmail.com", // Use the email address or domain you verified above
         subject: "Sending with Twilio SendGrid is Fun",
         text: "anshhhhhhffgdddddd easy to do anywhere, even with Node.js",
         html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      };
      try {
         await sgMail.send(msg);
         res.status(200).json({ msg: "Send email successful" });
      } catch (error) {
         res.status(200).json({ msg: error.message });
      }
   },
};

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//   to: 'test@example.com', // Change to your recipient
//   from: 'test@example.com', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })
