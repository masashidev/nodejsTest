console.log(process.env.USER); // 'darwin'
console.log(global.newVariable); // undefined
console.log(process.env.PORT); // undefined


// old style
// const { function1 } = require("./backModule");
// console.log(function1());

// new style


const { readFile } = require("fs").promises;
const express = require("express");
const path = require("path");


const app = express();

const frontBasePath = path.join(__dirname, "..", "front");
const frontPath = path.join(frontBasePath, "imageCombinator");

app.use(express.static(frontBasePath));

app.get("/", async (req, res) => {
  try {
    const data = await readFile(
      path.join(frontPath, "imageCombinator.html"),
      "utf8"
    );
    res.send(data);
    console.log("File sent");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Some error occurred");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:3000");
});
