const fs = require('fs');
const path = require('path');

const readJSON = filePath => new Promise((resolve, reject) => {
  fs.readFile(path.join(global.__root, filePath), (err, data) => {
    if (err) reject(err);
    try {
      resolve(JSON.parse(data));
    } catch (error) {
      reject(error);
    }
  });
});

module.exports = readJSON;
