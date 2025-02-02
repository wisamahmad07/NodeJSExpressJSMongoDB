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
//-------------------------------------------------------------------------------
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
//----------------------------------------------------------------------------------------
async function getCourse() {
  //   [comparison operators]```eq - ne - gt - gte - lt - lte - in - nin
  // .find({price : {$gt :10 , $lte :10}})
  // .find({ price: { $in: [10, 20, 30] } })

  //  [logical operators]```or - and
  // .find().or([{author: "wisam"},{isPublished:false}])
  // .and([{author: "wisam"},{isPublished:false}]) --> this is like passing in find({})

  //  [js-regular express or regex] [starts with -> /^.../] - [ends with -> /...$/] - [case insensitive -> /.../i]
  // starts with Mosh
  // .find({author: /^Mosh/})
  // ends with Hamedani
  // .find({author: /Hamedani$/i})
  // contains Mosh
  // .find({author: /.*Mosh.*/i})

  // counting
  // to all counts in db -> .find().countDocuments()
  // to filtering and then count -> .find({ author: "wisam" }).countDocuments()

  let pageNumber = 2;
  let pageSize = 10;
  // [from frontend] --- /api/courses?pageNumber=2&pageSize=10    ---limit and skip
  const courses = await Course.find({ author: "wisam" })
    .sort({ name: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ name: 1 })
    .countDocuments();
  console.log(courses);
}
//---------------------------------------------------------------------------------------------------------------
async function updateCourseQueryFirst(id) {
  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        name: "wisam",
        author: "ahmad",
        isPublished: false,
      },
    }
  );
  console.log(result);
}

async function updateCourseUpdateFirst(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        name: "maaz",
        author: "ahmad",
      },
    },
    { new: true }
  );
  console.log(course);
}
async function deleteCourse(id) {
  // const deletedResult = await Course.deleteOne({ _id: id });
  const deletedCourse = await Course.findByIdAndDelete(id);
  if (!deletedCourse) return console.log("course not found");
  console.log(deletedCourse);
}
// deleteCourse("66b9e8e1d0fb6d9e6adab513");
