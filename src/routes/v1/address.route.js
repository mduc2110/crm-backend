import { roleController } from "../../controllers/role.controller";

import express from "express";
import { address } from "../../services/address";

const router = express.Router();

router.get("/address/district", address.getDistrict);
router.get("/address/province", address.getProvince);
router.get("/address/ward", address.getWard);
export default router;
