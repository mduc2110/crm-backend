import express from "express";
import { userController } from "../../controllers/user.controller";
import passport from "passport";
// import db from "../../models/user.model";
import { auth } from "../../middlewares/checkAuth";

const router = express.Router();

// router.get("/users", (req, res) => {
//    return res.json("OK");
// });

router.get("/users/", passport.authenticate("jwt", { session: false }), userController.getAll);
router.get("/users/:id", passport.authenticate("jwt", { session: false }), userController.getOne);

router.post("/users/login", userController.login);
router.post("/users", userController.create);
router.put(
   "/users",
   passport.authenticate("jwt", { session: false }),
   auth.userAuth,
   userController.update
);
router.delete("/users/:id", userController.delete);

router.get("/depts", userController.getAllDept);

export default router;
