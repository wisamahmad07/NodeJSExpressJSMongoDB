console.log("before");
getUser(1, (user) => {
  console.log("user", user);

  getRepositories(user.name, (repo) => {
    console.log("user repos", repo);
  });
});
console.log("after");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("connecting to db...");
    callback({ id: id, name: "Mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("getting repos");
    callback(["repo1", "repo2"]);
  }, 2000);
}
