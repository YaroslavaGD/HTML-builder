const { stdin, stdout} = require("process");
const fs = require('fs');
const path = require('path');

copyFolder();

async function copyFolder() {
  try {
    await deleteFolder();
    await createFolder();
    await copyFiles();
  } catch (err) {
    console.log("MAIN ERROR: " + err);
  }

  async function deleteFolder() {
    try {
      await fs.promises.access(path.join(__dirname, 'files-copy'));
      await fs.promises.rm(path.join(__dirname, 'files-copy'), {recursive: true})
    } catch (err) {
      return false;
    }
  }
  
  async function createFolder() {
    try {
      await fs.promises.mkdir(path.join(__dirname, 'files-copy'), {recursive: true})
    } catch (err) {
      throw err;
    }
  }
  
  async function copyFiles() {
    try {
      const files = await fs.promises.readdir(path.join(__dirname, 'files'));
      files.forEach(file => {
        fs.promises.copyFile(
          path.join(__dirname,'files', file),
          path.join(__dirname, 'files-copy', file)
        );
      });
    } catch (err) {
      throw err;
    }
  }
}
