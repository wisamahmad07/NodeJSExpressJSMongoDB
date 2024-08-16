// Using References (Normalization) -> Consistency
let author1 = {
  name: "Mosh",
};
let course1 = {
  author1: "id",
};
// then populate method to find ref props

// Using Embedded Documents (DeNormalization) -> Performance
let course2 = {
  author2: {
    name: "Mosh",
  },
};

// Hybrid approach
let author3 = {
  name: "Mosh",
  // 50 other properties
};
let course3 = {
  author3: {
    id: "reference",
    name: "Mosh",
  },
};
// -----All genres Store separatedly in both cases (Fetch that genreId and store info from genre collection to other(movie) collection)
// 1) All genres Schema store in movies DB like embedding but only few props store of them stored by fetching id of genre.
// *2) specific schema is made and that specific props are stored using fetch id
