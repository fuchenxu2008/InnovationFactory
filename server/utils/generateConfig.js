const fs = require('fs');
const path = require('path');

const templates = {
  accessToken: {},
  timeslots: {
    hours: ['14:00-15:00', '15:00-16:00', '16:00-17:00'],
    unavailable: [],
    available: {
      open: [],
      scheduled: [],
    },
  },
};

const generateConfig = filename => new Promise((resolve, reject) => {
  try {
    const data = templates[filename] || {};
    fs.writeFile(path.join(global.__root, `config/${filename}.json`), JSON.stringify(data), (err) => {
      if (err) throw err;
      resolve();
    });
  } catch (error) {
    console.log('error: ', error);
    reject(error);
  }
});

module.exports = generateConfig;
