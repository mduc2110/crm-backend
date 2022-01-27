export const servicesController = {
   sendEmail : async (req, res) => {
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
   }
}