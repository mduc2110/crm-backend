import { taskController } from "../../controllers/task.controller";

import express from "express";

const router = express.Router();

router.post("/tasks", taskController.create);
router.get("/tasks/:id", taskController.getOne);
router.get("/tasks", taskController.getAll);
router.put("/tasks", taskController.update);
router.delete("/tasks", taskController.delete);

router.get("/tasks_types", taskController.getType);

export default router;
