import { createServer } from 'http';
import path from 'path';
import url from 'url';
import fs from 'fs/promises'; // async version of fs

const PORT = process.env.PORT || 3000;
const __filename = url.fileURLToPath(import.meta.url);
const __dataPath = path.join(__filename, '..', '..', "..", 'data');

console.log(__dataPath);

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
}
const jsonMiddleware = (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
}


// async callback
const server = createServer(async (req, res) => {
    if (req.url === "/api/sentences" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    const jsonFilePath = path.join(__dataPath, "sentences.json");
    const data = await fs.readFile(jsonFilePath);
    res.write(data);
    res.end();


    } else if (req.url.match(
      // /api/sentences/English
      /^\/api\/sentences\/[a-zA-Z]+$/
      ) && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    const langName = req.url.split("/")[3];
    const jsonFilePath = path.join(__dataPath, "sentences.json");
    const data = await fs.readFile(jsonFilePath);
    const sentences = JSON.parse(data);
    const sentence = sentences[langName];
      if (sentence) {
        res.write(JSON.stringify(sentence));
        res.end();
      } else {
        res.statusCode = 404;
        res.write(JSON.stringify({ message: "Not Found" }));
        res.end();
      }
    } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "Not Found" }));
    res.end();
    }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
