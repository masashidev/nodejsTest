console.log(styleText([colors.FgBlue, colors.Underscore], "Hello World"), "\n");

import colors, { styleText } from "../fontColors.js";
import http from "http";
import fs from "fs/promises"; // enable to use promises
import url from "url";
import path from "path";
const PORT = process.env.PORT || 3000;

// current file path
const __filename = url.fileURLToPath(import.meta.url);
// current directory path
const __dirname = path.dirname(__filename);
const __frontName = (path.join(__dirname, "..", "..", "front"));
const __dataName = (path.join(__dirname, "..", "..", "data"));


const server = http.createServer(async (req, res) => {
  console.log(req.url);
  console.log(req.method);
  // console.log(req.headers);
  try {
    if (req.method === "GET"){
      let filePath;
      if(req.url === "/") {
        filePath = path.join(__frontName, "main.html");
      } else if (req.url === "/sub") {
        filePath = path.join(__frontName, "sub.html");
      } else {
        throw new Error("Not Found");
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-Type", "text/html");
      res.write(data);
      res.end();// data has to be completed

    } else {
      res.writeHead(405, {
        "Content-Type": "text/html",
      });
      res.write("<h1>Method Not Allowed</h1>");
      res.end();// data has to be completed.
      return;
    }
  } catch (error) {
    console.error("Error:", error);
    res.writeHead(500, {
      "Content-Type": "text/html",
    });
    res.write("<h1>Internal Server Error</h1>");
    res.end();// data has to be completed.
    return;
  }
});


server.listen(PORT, () => {
  console.log(styleText([colors.FgMagenta], `Server is running on http://localhost:${PORT}`));
});
