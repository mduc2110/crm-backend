import express from "express";
import routes from "./routes";
const app = express();

app.use(express.json());

app.use("/api", routes);

app.listen(5555, () => {
   console.log("Server is running");
});
