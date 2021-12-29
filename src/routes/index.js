import express from "express";
import v1UserRouter from "./v1/user.route";
import v1RoleRouter from "./v1/role.route";
import v1PermissionRouter from "./v1/permission.route";
const route = express.Router();

route.use("/v1", v1UserRouter);
route.use("/v1", v1RoleRouter);
route.use("/v1", v1PermissionRouter);

export default route;
