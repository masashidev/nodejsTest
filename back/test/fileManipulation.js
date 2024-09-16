
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, "../../data/data.txt");


const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const writeFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, data);
    console.log("File written successfully");
  } catch (error) {
    console.error("Error:", error);
  }
};

const appendFile = async (filePath, data) => {
  try {
    await fs.appendFile(filePath, data);
  } catch (error) {
    console.error("Error:", error);
  }
}

const main = async ()=>{
  const texts = new Array(100).fill(0).map((_, i) => `${i}`);
  // make text elements 100 times longer
  const returnTexts = [];
  for (let i = 0; i < 10; i++) {
    returnTexts.push(...texts);
  }
  console.log(returnTexts.length);

  await writeFile(filePath, "Hello, World!\n");

  for (const text of returnTexts) {
    await appendFile(filePath, text + "\n");
  }

  // await readFile(filePath);
}

main();
// const nums = new Array(100).fill(0).map((_, i) => `${i}`);
// const nums = new Array(100).map((_, i) => `${i}`);
// const nums = Array.from({ length: 100 }, (_, i) => `${i}`);
// console.log(nums);
