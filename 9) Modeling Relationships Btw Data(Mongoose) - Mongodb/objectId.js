// CHECK customers.js FOR MORE DETAIL IN EXERCISE

const mongoose = require("mongoose");

// if create new valid objectid of mongodb (manually)
// const mongoObjectId = new mongoose.Types.ObjectId("123456789123456789123456");
const mongoObjectId = new mongoose.Types.ObjectId();
console.log(mongoObjectId.getTimestamp());
console.log(mongoObjectId);

const isValid = mongoose.Types.ObjectId.isValid(mongoObjectId);
console.log(isValid);

// _id: 66c0cd3202cc4e0a72e410b4

// 12 bytes
// 4 bytes: timestamp
// 3 bytes: machine identifier
// 2 bytes: process identifier
// 3 bytes: incremental Counter

// 1 byte = 8 bits
// 2 ^ 8 = 256 characters
// 2 ^ 24 = 16M

// Mongoose talk with MongoDB driver to generate ObjectId not by mongoDB itself
// Driver -> MongoDB
