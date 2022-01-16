import { customerController } from "../../controllers/customer.controller";
import express from "express";

const router = express.Router();

router.post("/customer", customerController.create);
router.get("/customers", customerController.getAll);
router.get("/customers/:id", customerController.getOne);
router.put("/customers/:id", customerController.update);
router.delete("/customers/:id", customerController.delete);

export default router;

// "idWard" : "27439-0001",
