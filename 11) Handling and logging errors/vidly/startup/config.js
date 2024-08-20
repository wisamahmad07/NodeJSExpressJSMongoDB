const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const portLogger = require("../configuration/mongodbConnect");
const fatalError = require("../configuration/envFatalError");

module.exports = function (app) {
  if (!process.env.jwtPrivateKey) {
    fatalError.info("FATAL ERROR");
    setTimeout(() => {
      process.exit(1);
    }, 3000);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => portLogger.info(`Listening on port ${port}...`));
};
