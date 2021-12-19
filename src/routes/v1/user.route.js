import express from "express";
import { userController } from "../../controllers/user.controller";
const router = express.Router();

// router.get("/users", (req, res) => {
//    return res.json("OK");
// });
router.get("/users/", userController.getAll);
router.get("/user/:id", userController.getOne);
router.post("/user/login", userController.login);
router.post("/user", userController.create);
router.put("/user", userController.update);
router.delete("/user", userController.delete);

export default router;
