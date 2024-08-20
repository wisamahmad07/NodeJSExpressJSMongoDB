const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "uncaughtExceptionErrors.log" }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      collection: "uncaughtExceptionErrors",
      options: { useUnifiedTopology: true },
      metaKey: "meta",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});
