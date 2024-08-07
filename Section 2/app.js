const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    console.log(req.socket);
    console.log("listeining inside");
    res.end();
  }
  if (req.url === "/api/course") {
    res.write(JSON.stringify(["Mosh", "Wisam", "Maaz"]));
    res.end();
  }
});

server.listen(1000);

console.log("listening start");
