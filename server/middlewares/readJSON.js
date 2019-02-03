const fs = require('fs');

const readJSON = path => new Promise((resolve, reject) => {
  fs.readFile(require.resolve(path), (err, data) => {
    if (err) reject(err);
    else resolve(JSON.parse(data));
  });
});

module.exports = readJSON;
