//console.log(process);

//1. Spawn
/*
The Spawn function will run a command in a process. After running the command, 
the data that gets returned from the command, will be in the form of streams.
this means it's purely going to be asyc. 
Whenever a piece of data is ready to be sent back to the response, it will be passed to the standard
output stream and if there's an error it will be passed to standard error stream. 
*/

const { spawn, exec } = require("child_process");

//Shell: true is basically telling the spawn function to open up a shell and then run this command in that shell.
let listFiles = spawn("dir", ["/b"], { shell: true });

listFiles.stderr.on("data", (error) => {
  console.log(error);
});

listFiles.stdout.on("data", (data) => {
  console.log(data.toString());
});

listFiles.on("error", (error) => {
  console.log(`Some error occurred while running spawn: ${error.message}`);
});

//2. Exec
//In case of spawn we used to pass in the arguments inside the array but exec has no argument and it takes
//whole command string as it is.

//Spawn used to return data in form of streams which is why we have to listent to the stdout and stderr
//In case of exec, behind the scenes there is buffer storage, inside the buffer storage all those chunks are stored
//and only when the whole response is fetched, we get the response. it returns whole piece of response together.
//So in case of spawn there  was no limit of size in response because it was sent back in chunks. we can potentially
//get a huge response over a period of time.

//In case of exec, it waits for the buffer to be filled first. once it's filled it will return the whole response.
//This is obviously an issue here because what if the size of the response is bigger than the buffer, application
//will abruptly crash.
exec("copy app.js dummyFile.js", (error, stdout, stderr) => {
  if (error) {
    return console.log(error);
  }
  if (stderr) {
    return console.log(stderr);
  }
  console.log(stdout);
});
