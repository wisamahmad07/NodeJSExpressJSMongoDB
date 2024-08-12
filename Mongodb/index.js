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
  //   [comparison operators]```eq - ne - gt - gte - lt - lte - in - nin
  // .find({price : {$gt :10 , $lte :10}})
  // .find({ price: { $in: [10, 20, 30] } })

  //  [logical operators]```or - and
  // .find().or([{author: "wisam"},{isPublished:false}])
  // .and([{author: "wisam"},{isPublished:false}]) --> this is like passing in find({})
  const courses = await Course.find({ author: "wisam" })
    .sort({ name: -1 })
    .limit(2)
    .select({ name: 1 });
  console.log(courses);
}

getCourse();
