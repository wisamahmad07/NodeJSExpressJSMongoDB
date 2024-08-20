const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const fatalError = require("../configuration/envFatalError");

module.exports = function () {
  if (!process.env.jwtPrivateKey) {
    fatalError.info("FATAL ERROR");
    setTimeout(() => {
      process.exit(1);
    }, 3000);
  }
};
