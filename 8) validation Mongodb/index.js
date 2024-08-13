const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/course_crud_api")
  .then(() => console.log("Successfully, Connected to MongDB..."))
  .catch((err) => console.log("Error in connecting to MongDB", err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // minlength: 3,
    // maxlength: 255,
    trim: true,
    /* match: /pattern/, */
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: async function (v) {
        await new Promise((resolve) =>
          setTimeout(() => {
            const result = v && v.length > 0;
            console.log("result", result);
            resolve(result);
          }, 3000)
        );
      },
      message: "Enter atleast 1 tag",
    },
  },
  date: {
    type: String,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 3,
    max: 1000,
  },
});
const Course = mongoose.model("Course", courseSchema);
//-------------------------------------------------------------------------------
// build-in validations
async function createCourse2() {
  const course = new Course({
    name: "hellow world",
    author: "wisam",
    tags: ["web"],
    isPublished: true,
    price: 14,
    category: "web",
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
createCourse2();
//-------------------------------------------------------------------------------
// required validation
async function createCourse1() {
  const course = new Course({
    name: "react course",
    // author: "wisam",
    tags: ["react", "typescript"],
    isPublished: true,
  });
  try {
    // await course.validate();
    const result = await course.save();
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
// createCourseDocument();
