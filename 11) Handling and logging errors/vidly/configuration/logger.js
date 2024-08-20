const winston = require("winston");

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "logfile.log" }),
    new winston.transports.Console(),
  ],
});
