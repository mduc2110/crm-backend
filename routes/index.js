import express from "express";
import v1RouterUser from "./v1/users.routes";
const route = express.Router();

route.use("/v1", v1RouterUser);

export default route;
