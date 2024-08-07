const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
    // raises event but as it is scyn so add listenser before so that is register and we dont get undefined
    this.emit("post", { id: 1, name: "Mosh" });
  }
}

module.exports = Logger;
