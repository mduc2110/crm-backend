export const auth = {
   userAuth: (req, res, next) => {
      console.log(req.user);
      next();
   },

   customerAuth: (req, res, next) => {
      // console.log(req.user);
      if (req.user.permissions.includes("READ_CAMPAIN")) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   campaignAuth: (req, res, next) => {
      console.log(req.user);
      next();
   },

   readCutomer: (req, res, next) => {
      if (req.user.permissions.includes("READ_CUSTOMER")) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   writeCutomer: (req, res, next) => {
      if (req.user.permissions.includes("WRITE_CUSTOMER")) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
};
