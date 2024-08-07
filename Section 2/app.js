const fs = require("fs");

fs.readdir("./", (err, files) => {
  if (err) return console.log(`err ${err}`);
  if (files) return console.log("files", files);
});
