const { execFile, fork } = require("child_process");

//execFile unlike exec won't run your file inside a shell, instead it spawns the executable file as a
//new child process making it slightly more efficient than exec.

//If you have problem running exec on windows system, you can use the shell option just like the we did in case
//of spawn method.

execFile("node", ["--version"], { shell: true }, (error, stdout, stderr) => {
  if (error) {
    return console.log(error);
  }
  if (stderr) {
    return console.log(stderr);
  }
  console.log("Output: ", stdout);
});

//Fork

//This fork method just like the other methods such as exec, spawn and all, spawns a new node.js process
//but this time it also invokes a module that creates and ipc(inter-process-communication) channel
//between the child and parent process so that they could send messages to each other during a certain event.
//so anytime a certain event occurs, a child can send a message to parent or a parent can send message to the child

// const child = fork("./child.js", [/*this is optional arg*/ "hello", 1]);
const child = fork("./child_app2.js");
//The file child.js is executed the moment we create forq in our parent process.
child.send({ message: "Hello Child from parent!" });
//listen close event from child
child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});

child.on("message", (msg) => {
  console.log(msg);
});
