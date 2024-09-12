import { readFile } from "fs/promises";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const frontBasePath = path.join(__dirname, "..", "front");
const frontPath = path.join(frontBasePath, "imageCombinator");

app.use(express.static(frontPath));

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
