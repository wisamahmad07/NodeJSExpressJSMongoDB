const os = require("os");
if (os.totalmem() > os.freemem()) return console.log("j");
