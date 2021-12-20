import express from "express";
import { userController } from "../../controllers/user.controller";
import passport from "passport";
import db from "../../models/user.model";
import { auth } from "../../middlewares/checkAuth";

const User = db.User;

const router = express.Router();

// router.get("/users", (req, res) => {
//    return res.json("OK");
// });

router.get("/users/", userController.getAll);
router.get("/user/:id", passport.authenticate("jwt", { session: false }), userController.getOne);

router.post("/user/login", userController.login);
router.post("/user", userController.create);
router.put("/user", passport.authenticate("jwt", { session: false }), auth.userAuth, userController.update);
router.delete("/user", userController.delete);

export default router;
