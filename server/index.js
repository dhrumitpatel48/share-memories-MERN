import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotnev from "dotenv";

const app = express();
dotnev.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", false);
mongoose
  .connect(CONNECTION_URL, {
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(`Error while connecting mongodb : ${error}`));
