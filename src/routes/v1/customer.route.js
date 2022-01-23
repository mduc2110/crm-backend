import { customerController } from "../../controllers/customer.controller";
import express from "express";
import passport from "passport";
import { auth } from "../../middlewares/checkAuth";

const router = express.Router();

router.post("/customer", customerController.create);
router.get("/customers", passport.authenticate("jwt", { session: false }), auth.customerAuth, customerController.getAll);
router.get("/customers/:id", customerController.getOne);
router.put("/customers/:id", customerController.update);
router.delete("/customers", customerController.delete);

export default router;

// "idWard" : "27439-0001",
