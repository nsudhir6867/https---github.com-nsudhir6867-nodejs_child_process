const { fork } = require("child_process");
const http = require("http");

const server = http.createServer();

server.on("request", (req, res) => {
  if (req.url == "/heavy") {
    const child = fork("./child_app3.js");
    child.send("start");
    child.on("message", (msg) => {
      res.end(msg);
    });
    console.log("Heavy request");
  } else if (req.url == "/light") {
    res.end("success! operation complete");
    console.log("Light request");
  }
});

server.listen(3000, () => {
  console.log("Listening to server at 3000");
});
