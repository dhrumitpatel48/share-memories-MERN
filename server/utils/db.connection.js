import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../logger/logger.js";
dotenv.config();

class Database {
  constructor() {
    this.connect();
  }
  async connect() {
    const CONNECTION_URL = process.env.MONGODB_CONNECTION_URI;
    mongoose
      .connect(CONNECTION_URL, {
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(`MongoDB connection established successfully.`);
        logger.info("MongoDB connection established successfully.");
      })
      .catch((error) => {
        console.log(`Error while connecting mongodb : ${error}`);
        logger.error(`Error while connecting mongodb : ${error}`);
      });
  }
}
mongoose.set("strictQuery", false);
export const dbConnection = new Database();
