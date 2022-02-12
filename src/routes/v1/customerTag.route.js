import { customerTagController } from "../../controllers/customerTag.controller";
import express from "express";
import passport from "passport";
import { auth } from "../../middlewares/checkAuth";

const router = express.Router();

router.get("/customer_tags", customerTagController.getAll);
router.get("/customer_status", customerTagController.getAllStatus);

export default router;
