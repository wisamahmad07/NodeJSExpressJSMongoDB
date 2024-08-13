const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log("connected"))
  .catch((err) => console.log("error", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: String,
    default: Date.now,
  },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourse() {
  const result = await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i },
  ]);
  console.log(result);
}
getCourse();
