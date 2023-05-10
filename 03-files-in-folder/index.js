const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

async function getFolderInfo() {
  const files =  await fs.promises.readdir(secretFolderPath, { withFileTypes: true }); 
  
  for (const file of files) {
    if (file.isFile()) {
      const filePath = path.join(secretFolderPath, file.name);

      let fileName = path.basename(filePath);
      let fileExtension = path.extname(filePath);

      fileName = fileName.replace(fileExtension, '');
      fileExtension = fileExtension.replace('.', '');
      
      const statResult = await fs.promises.stat(filePath);
    
      console.log(fileName + ' - ' + fileExtension + ' - ' + statResult.size + 'b');
        
    }
  }
}

getFolderInfo();