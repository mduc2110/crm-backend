import { roleController } from "../../controllers/role.controller";

import express from "express";

const router = express.Router();

router.post("/role", roleController.create);
router.get("/role/:id", roleController.getOne);
router.get("/roles", roleController.getAll);
router.put("/role", roleController.update);
router.delete("/role", roleController.delete);

export default router;
