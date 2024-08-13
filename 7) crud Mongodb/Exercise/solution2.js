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
  const result = await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
  })
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
  console.log(result);
}
getCourse();
