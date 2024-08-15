const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: String,
  website: String,
});

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    author: authorSchema,
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}
async function updateCourse(courseId) {
  //   QUERING FIRST
  //   const course = await Course.findById(courseId);
  //   course.author.name = "WISAM AHMAD";

  // UPDATE DIRECTLY
  const course = await Course.updateOne(
    { _id: courseId },
    {
      //   $set: {
      //     "author.name": "MAAZ AHMAD",
      //   },
      $unset: {
        author: "",
      },
    }
  );
}

// createCourse("Node Course", new Author({ name: "Mosh" }));
updateCourse("66bda53016e07387d73eb7ef");
