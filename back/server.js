console.log(process.env.USER); // 'darwin'
console.log(global.newVariable); // undefined
// console.log(process)

// process.on("exit", () => {
//   console.log("Why you leave?");
// });

// process.on("enter", () => {
//   console.log("Welcome Back!");
// });

// const { EventEmitter } = require("events");
// const eventEmitter = new EventEmitter();

// eventEmitter.on("valueUpdated", () => {
//   console.log("Value updated");
// });

// eventEmitter.emit("valueUpdated");

// const { readFile, readFileSync, read } = require("fs");
// const data = readFileSync("./sample.txt", "utf8");

// readFile("./sample.txt", "utf8", (err, data) => {
//   if (err) return console.log(err);
//   console.log(data);
// });

console.log("end of the file");

// const { readFile } = require("fs").promises;
// async function readData() {
//   const data = await readFile("./data/sample.txt", "utf8");
//   console.log(data);
// }

// readData();

// const myModule = require("./backModule");
// myModule.updateAge();

// console.log(myModule);

const { readFile } = require("fs").promises;
const express = require("express");
const path = require("path");

const app = express();

const frontPath = path.join(__dirname, "..", "front/imageCombinator");

app.use(express.static(frontPath));

// app.get("/", (req, res) => {
//   readFile(path.join(frontPath, "main.html"), "utf8", (err, data) => {
//     if (err) {
//       console.error("Error:", err);
//       res.status(500).send("Some error occurred");
//     } else {
//       res.send(data);
//     }
//   });
// });

app.get("/", async (req, res) => {
  try {
    const data = await readFile(
      path.join(frontPath, "imageCombinator.html"),
      "utf8"
    );
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Some error occurred");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000");
});
