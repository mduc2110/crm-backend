import express from "express";
import routes from "./routes";
import db from "./models/index";

const port = process.env.PORT || 5555;
const app = express();

app.use(express.json());

db.sequelize.sync({ alter: true });

app.use("/api", routes);

app.listen(port, () => {
   console.log(`Server is running on ${port}`);
});
