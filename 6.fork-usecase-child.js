console.log("child process");
//argv is passed from parent process during creation of forq.
//console.log(process.argv);

process.on("message", (msg) => {
  let counter = 0;
  while (counter < 9000000000) {
    counter++;
  }
  process.send(`${counter} iterated!`);
});
