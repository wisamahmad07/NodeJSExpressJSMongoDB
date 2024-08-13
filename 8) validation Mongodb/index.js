const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/course_crud_api")
  .then(() => console.log("Successfully, Connected to MongDB..."))
  .catch((err) => console.log("Error in connecting to MongDB", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: {
    type: String,
    default: Date.now,
  },
  isPublished: Boolean,
});
const Course = mongoose.model("Course", courseSchema);
//-------------------------------------------------------------------------------
async function createCourseDocument() {
  const course = new Course({
    name: "react course",
    // author: "wisam",
    tags: ["react", "typescript"],
    isPublished: true,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
createCourseDocument();
