import { customerController } from "../../controllers/customer.controller";
import express from "express";
import passport from "passport";
import { auth } from "../../middlewares/checkAuth";
import uploadFile from "../../middlewares/uploads";

const router = express.Router();

router.post("/customers", customerController.create);
router.post(
   "/customers/uploads",
   uploadFile.single("file"),
   customerController.createCustomersWithExcelFiles
);
router.get(
   "/customers",
   passport.authenticate("jwt", { session: false }),
   auth.readCustomerAuth,
   customerController.getAll
);
router.get(
   "/customers/:id",
   passport.authenticate("jwt", { session: false }),
   auth.readCustomerAuth,
   customerController.getOne
);
router.put("/customers/:id", customerController.update);
router.delete("/customers", customerController.delete);
router.delete("/customerss", customerController.test);

export default router;

// "idWard" : "27439-0001",
