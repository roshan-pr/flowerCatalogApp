const fs = require('fs');

const readFile = (fileName) => {
  return fs.readFileSync(fileName);
};

const readFiles = (directory) => {
  fileContents = {};

  const files = fs.readdirSync(directory);
  files.forEach(file => {
    const fileName = `${directory}/${file}`;
    if (fs.statSync(fileName).isDirectory()) {
      fileContents = { ...fileContents, ...readFiles(fileName) };
      return;
    }
    fileContents[fileName] = readFile(fileName);
  });

  return fileContents;
};

module.exports = { readFiles };
