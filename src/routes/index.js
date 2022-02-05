import express from "express";
import v1UserRouter from "./v1/user.route";
import v1RoleRouter from "./v1/role.route";
import v1PermissionRouter from "./v1/permission.route";
import v1CustomerRouter from "./v1/customer.route";
import v1TaskRouter from "./v1/task.route";
import { address } from "../services/address";
const route = express.Router();
import addressRouter from "./v1/address.route";
route.use("/v1", v1UserRouter);
route.use("/v1", v1RoleRouter);
route.use("/v1", v1PermissionRouter);

route.use("/v1", v1CustomerRouter);
route.use("/v1", v1TaskRouter);

route.use("/", addressRouter);

export default route;
