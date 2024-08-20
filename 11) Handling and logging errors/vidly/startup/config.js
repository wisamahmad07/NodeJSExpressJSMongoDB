const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

module.exports = function () {
  if (!process.env.jwtPrivateKey) {
    console.log("FATAL ERROR");
    process.exit(1);
  }
};
