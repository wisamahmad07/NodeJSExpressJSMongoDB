const Logger = require("./logger");
const logger = new Logger();

logger.on("post", (args) => {
  console.log(args);
});
logger.log("helo");
