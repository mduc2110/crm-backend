import { servicesController } from "../../controllers/services.controller";

import express from "express";

const router = express.Router();

router.post("/sendMail", servicesController.sendEmail);

export default router;
