const { stdout } = require("process");
const fs = require('fs');
const path = require('path');

// fs.readFile(
//   path.join(__dirname, 'text.txt'),
//   'utf-8',
//   (err, data) => {
//     if (err) throw err;
//     console.log(data);
//   }
// );

const file = fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8'
);

file.on('data', data => stdout.write(data));