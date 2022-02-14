import { servicesController } from "../../controllers/services.controller";

import express from "express";

const router = express.Router();

router.post("/sendMail", servicesController.sendEmail);

router.get("/mail", servicesController.getAll);
router.get("/mail/:email", servicesController.getOne);

export default router;
