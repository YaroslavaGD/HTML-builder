const { stdin, stdout} = require("process");
const fs = require('fs');
const path = require('path');


const openDir = fs.promises.readdir(

  path.join(__dirname, 'secret-folder'),
  { withFileTypes: true }

).then( files => { 

    files.forEach( file => {
      if (!file.isDirectory()) {
        let filePath = path.join(__dirname, 'secret-folder', file.name);
        let fileName = path.basename(filePath);
        let fileExtension = path.extname(filePath);
        
        fs.promises.stat(filePath).then(result => {

          fileName = fileName.replace(fileExtension, '');
          fileExtension = fileExtension.replace('.', '');
          console.log(fileName + ' - ' + fileExtension + ' - ' + result.size + 'b');
        });
      }
    });

});