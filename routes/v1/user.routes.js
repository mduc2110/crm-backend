import express from "express";
import { userController } from "../../controllers/user.controller";
const router = express.Router();

// router.get("/users", (req, res) => {
//    return res.json("OK");
// });
router.get("/users", userController.addUser);

export default router;
