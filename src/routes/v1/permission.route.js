import { permissionController } from "../../controllers/permission.controller";

import express from "express";

const router = express.Router();

router.post("/permission", permissionController.create);
router.get("/permission/:id", permissionController.getOne);
router.get("/permissions", permissionController.getAll);
router.put("/permission", permissionController.update);
router.delete("/permission", permissionController.delete);

export default router;
