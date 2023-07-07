const { spawn, exec } = require("child_process");

exec(
  "node nodeMod.js",
  { maxBuffer: 1024 * 1024 * 4 },
  (error, stdout, stderr) => {
    if (error) {
      return console.log(error);
    }
    if (stderr) {
      return console.log(stderr);
    }
    console.log("Exec ", stdout);
  }
);

let spawnEx = spawn("node", ["nodeMod.js"], { shell: true });

spawnEx.stderr.on("data", (error) => {
  console.log(error);
});

spawnEx.stdout.on("data", (data) => {
  console.log("Spawn ", data.toString());
});

spawnEx.on("error", (error) => {
  console.log(`Some error occurred while running spawn: ${error.message}`);
});
//If you observe carefully spawn will give data in chunks but exec will give data in one go.
