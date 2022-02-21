import { taskController } from "../../controllers/task.controller";

import express from "express";
import passport from "passport";

const router = express.Router();

router.post("/tasks", passport.authenticate("jwt", { session: false }), taskController.create);
router.get("/tasks/:id", passport.authenticate("jwt", { session: false }), taskController.getOne);
router.get("/tasks", passport.authenticate("jwt", { session: false }), taskController.getAll);
router.put("/tasks/:id", passport.authenticate("jwt", { session: false }), taskController.update);
router.delete(
   "/tasks/:id",
   passport.authenticate("jwt", { session: false }),
   taskController.delete
);

router.get("/tasks_types", taskController.getType);

export default router;
