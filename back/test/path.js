import url from "url";

const urlString =
  "https://docs.google.com/spreadsheets/d/1CXyXUaT8sKoR4CbbNBcS1GUZdxFLn6NkCvayp0YeLsk/edit?gid=1334269603#gid=1334269603";


const urlObject = new URL(urlString);

console.log(urlObject);

const params = new URLSearchParams(urlObject.search);
console.log(params)

// use of url module


