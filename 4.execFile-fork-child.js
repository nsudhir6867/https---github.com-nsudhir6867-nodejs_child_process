console.log("child process");
//argv is passed from parent process during creation of forq.
console.log(process.argv);

process.on("message", (msg) => {
  console.log("Message from parent: ", msg);
  process.exit(0);
});

process.send({ message: "Child's message to parent." });
