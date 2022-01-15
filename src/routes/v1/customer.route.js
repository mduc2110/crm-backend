import { customerController } from "../../controllers/customer.controller";
import express from "express";

const router = express.Router();

router.post("/customer", customerController.create);
router.get("/customers", customerController.getAll);
router.get("/customer/:id", customerController.getOne);
router.put("/customer/:id", customerController.update);
router.delete("/customer/:id", customerController.delete);

export default router;

// "idWard" : "27439-0001",
