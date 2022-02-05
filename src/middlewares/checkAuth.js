const isHadPermission = (permissionList, permissionType, role = "") => {
   return permissionList.includes(permissionType) || role === "ADMIN";
};

export const auth = {
   userAuth: (req, res, next) => {
      console.log(req.user);
      next();
   },

   customerAuth: (req, res, next) => {
      // console.log(req.user);
      if (isHadPermission(req.user.permissions, "READ_CAMPAIN", req.user.role)) {
         next();
      }
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

   //User
   readUserAuth: (req, res, next) => {
      if (isHadPermission(req.user.permissions, "READ_USER", req.user.role)) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   writeUserAuth: (req, res, next) => {
      if (isHadPermission(req.user.permissions, "WRITE_USER", req.user.role)) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   //Customer
   readCustomerAuth: (req, res, next) => {
      if (isHadPermission(req.user.permissions, "READ_CUSTOMER", req.user.role)) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   writeCustomerAuth: (req, res, next) => {
      if (isHadPermission(req.user.permissions, "WRITE_CUSTOMER", req.user.role)) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   //Task
   readTaskAuth: (req, res, next) => {
      if (isHadPermission(req.user.permissions, "READ_TASK", req.user.role)) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
   writeTaskAuth: (req, res, next) => {
      if (isHadPermission(req.user.permissions, "WRITE_TASK", req.user.role)) {
         next();
      } else {
         return res.status(403).json({ msg: "Forbidden" });
      }
   },
};
