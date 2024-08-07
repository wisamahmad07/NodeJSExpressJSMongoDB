const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("event", () => {
  console.log("ok called bro");
});

emitter.emit("event");
