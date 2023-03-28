import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotnev from "dotenv";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/users.routes.js";
import logger from "./logger/logger.js";
import "./utils/db.connection.js"; // Import mongodb connection

const app = express();
dotnev.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
logger.info(`Server is running on port: ${PORT}`);
