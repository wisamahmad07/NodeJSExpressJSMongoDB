const EventEmitter = require("events");

const emitter = new EventEmitter();

const logger = emitter.on("post", (arg) => {
  console.log(`message is logged ${arg.id} ${arg.name}`);
});

module.exports = logger;
