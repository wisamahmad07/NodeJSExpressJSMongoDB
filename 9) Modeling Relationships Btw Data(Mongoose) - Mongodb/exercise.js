const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/exercisehybrid")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
});
const Genre = mongoose.model("Genre", genreSchema);

const Movie = mongoose.model(
  "Movies",
  new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: genreSchema, required: true },
    numberInStocks: { type: Number, default: 0 },
    dailyRentalRate: { type: Number, default: 0 },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Genre({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Movie({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Movie.find()
    .populate("author", "name -_id")
    .select("name author -_id");
  console.log(courses);
}

// createAuthor("Mosh", "My bio", "My Website");

// createCourse("Node Course", "66bcd2ab5db3a91803071be3");

listCourses();
