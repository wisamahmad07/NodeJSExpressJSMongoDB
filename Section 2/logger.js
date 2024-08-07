// exports, require, module, __filename, __dirname are scope to this module

console.log(__filename);

// implementation detail (no export)
url = "http://logger.io/log";

function logger(message) {
  //...
  console.log(message);
}

module.exports = logger;
