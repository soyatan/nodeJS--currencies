const fs = require("fs");

const readTheFile = (filePath, callback) => {
  const data = fs.readFileSync(`./${filePath}`, "utf-8");
  callback(JSON.parse(data));
};

const writeTheFile = (data, filePath, callback) => {
  fs.writeFile(`./${filePath}`, JSON.stringify(data), "utf-8", (err) => {
    console.log(`file has been written to ${filePath}`);
  });
};

module.exports = {
  writeTheFile,
  readTheFile,
};
