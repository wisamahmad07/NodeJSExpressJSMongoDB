// Using References (Normalization) -> Consistency
let author1 = {
  name: "Mosh",
};
let course1 = {
  author: "id",
};

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
