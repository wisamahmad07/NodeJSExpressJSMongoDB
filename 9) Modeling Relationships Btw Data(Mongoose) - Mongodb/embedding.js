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
const Author = mongoose.model("Author", authorSchema);
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
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

async function updateCourseArray(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  if (!course) return console.log("course not found");

  const author = course.authors.id(authorId);
  if (!author) return console.log("author not found");

  author.deleteOne();
  course.save();
}
removeAuthor("66bdae9bb6fec08ee646fa38", "66bdae9bb6fec08ee646fa35");
// updateCourseArray("66bdae9bb6fec08ee646fa38", new Author({ name: "SHERWAN" }));

// createCourse("Node Course", [
//   new Author({ name: "MOSH" }),
//   new Author({ name: "MAAZ" }),
//   new Author({ name: "WISAM" }),
// ]);
// updateCourse("66bda53016e07387d73eb7ef");
