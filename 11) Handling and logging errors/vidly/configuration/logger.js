const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "AllErrorslogfile.log" }),
    new winston.transports.Console(),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      collection: "AllErrors",
      options: { useUnifiedTopology: true },
      metaKey: "meta",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// exceptionHandlers: [
//   new winston.transports.File({ filename: "ExceptionErrors.log" }),
// ],
// rejectionHandlers: [
//   new winston.transports.MongoDB({
//     db: "mongodb://localhost:27017/vidly",
//     collection: "RejectionErrors",
//     options: { useUnifiedTopology: true },
//     metaKey: "reject",
//     format: winston.format.combine(
//       winston.format.timestamp(),
//       winston.format.json()
//     ),
//   }),
// ],
