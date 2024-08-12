const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/course_crud_api")
  .then(() => console.log("Successfully, Connected to MongDB..."))
  .catch((err) => console.log("Error in connecting to MongDB", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {
    type: String,
    default: Date.now,
  },
  isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);
async function createCourseDocument() {
  const course = new Course({
    name: "react course",
    author: "wisam",
    tags: ["react", "typescript"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourse() {
  const courses = await Course.find({ author: "wisam" })
    .sort({ name: -1 })
    .limit(2)
    .select({ name: 1 });
  console.log(courses);
}

getCourse();
