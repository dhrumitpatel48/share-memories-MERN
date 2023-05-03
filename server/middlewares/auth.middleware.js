import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../logger/logger.js";
dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    logger.error(`Error in auth Middeware: ${error}`);
    console.log(error);
  }
};

export default auth;
