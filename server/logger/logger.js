import { devLogger } from "./config/dev.config.js";
import { prodLogger } from "./config/prod.config.js";
import dotnev from "dotenv";
dotnev.config();

let logger = null;

if (process.env.NODE_ENV.trim().toLowerCase() === "production") {
  logger = prodLogger();
} else {
  logger = devLogger();
}

export default logger;
