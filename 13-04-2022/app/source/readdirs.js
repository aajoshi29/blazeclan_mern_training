import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

let __fileName = fileURLToPath(import.meta.url);
let dirPathToRead = path.join(__fileName, "../../files");

const readAllFiles = (error, dirContents) => {
  console.log(dirContents);
  if (error) {
    console.log(`Directory Read Failed ${error.message}`);
    return;
  }
  dirContents.forEach((content) => {
    fs.stat(`${dirPathToRead}/${content}`, (err, stat) => {
      if (err) {
        console.log(`Content Read Failed ${err.message}`);
        return;
      }
      if (stat.isDirectory()) {
        // console.log(content, stat.isDirectory());
        // console.log(`${dirPathToRead}\\${content}`);
        fs.readdir(`${dirPathToRead}\\${content}`, readAllFiles);
        // onReadAllFiles(`${dirPathToRead}\\${content}`);
        // readAllFiles(err, content);
      }
      if (stat.isFile()) {
        console.log(`Current File Name = ${content}`);
        let data = fs.readFileSync(`${dirPathToRead}/${content}`, {
          encoding: "utf8",
        });
        console.log(`File Contents are = ${data}`);
      } else {
      }
    });
  });
};

function onReadAllFiles(path) {
  fs.readdir(path, readAllFiles);
}

onReadAllFiles(dirPathToRead);
