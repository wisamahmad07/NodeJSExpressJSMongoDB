console.log("before");
getUser((user) => {
  console.log("user", user);

  getRepositories((repo) => {
    console.log("user repos", repo);
  });
});
console.log("after");

function getUser(callback) {
  setTimeout(() => {
    console.log("connecting to db...");
    callback({ id: 1, name: "Mosh" });
  }, 2000);
}

function getRepositories(callback) {
  setTimeout(() => {
    console.log("getting repos");
    callback(["repo1", "repo2"]);
  }, 2000);
}
