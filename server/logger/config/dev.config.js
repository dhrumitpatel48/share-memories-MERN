import winston from "winston";

export const devLogger = () => {
  return winston.createLogger({
    level: "debug",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss" }),
      winston.format.printf(
        (info) =>
          `${JSON.stringify({
            timestamp: info.timestamp,
            level: info.level,
            message: info.message,
          })}`
      )
    ),
    transports: [
      new winston.transports.File({ filename: "logger/logs/all-logs.log" }),
    ],
  });
};
