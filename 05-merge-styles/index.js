const { stdin, stdout} = require("process");
const fs = require('fs');
const path = require('path');

mergeStyles();

async function mergeStyles() {
  try {
    const resultFile = fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'bundle.css')
    );

    const files = await fs.promises.readdir(
      path.join(__dirname, 'styles'), 
      {withFileTypes: true}
    );

    files.forEach(file => {
      if (!file.isDirectory()) {
        let filePath = path.join(__dirname, 'styles', file.name);
        let fileName = path.basename(filePath);
        let fileExtension = path.extname(filePath);
  
        if (fileExtension === '.css') {
          const sourceFile = fs.createReadStream(
            path.join(__dirname, 'styles', fileName)
          );
  
          sourceFile.on('data', data => {
            resultFile.write(data.toString() + '\n');
          });
        }
      }
    });

  } catch (err) {
    console.log("main error: " + err);
  }
}