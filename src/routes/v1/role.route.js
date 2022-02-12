import { roleController } from "../../controllers/role.controller";

import express from "express";
import { auth } from "../../middlewares/checkAuth";
import passport from "passport";

const router = express.Router();

router.post("/roles", roleController.create);
router.get("/roles/:id", passport.authenticate("jwt", { session: false }), roleController.getOne);
router.get("/roles", passport.authenticate("jwt", { session: false }), roleController.getAll);
router.put("/roles", passport.authenticate("jwt", { session: false }), roleController.update);
router.delete(
   "/roles/:id",
   passport.authenticate("jwt", { session: false }),
   roleController.delete
);

router.get("/role_permissions/:id", roleController.getPermissionWithRoleId);
router.post("/role_permissions", roleController.updatePermissionForRole);

// router.get("/permissions", roleController.getAllPermision);

export default router;
