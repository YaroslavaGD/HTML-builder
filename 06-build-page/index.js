const fs = require('fs');
const path = require('path');

const resultFolderPath = path.join(__dirname, 'project-dist');

const assetsPath = path.join(__dirname, 'assets');
const resultAssetsPath = path.join(resultFolderPath, 'assets');

const componentsPath = path.join(__dirname, 'components');
// const resultComponentsPath = path.join(resultFolderPath, 'components');

const stylesPath = path.join(__dirname, 'styles');
const resultStylesPath = path.join(resultFolderPath, 'style.css');


const templateHtmlPath = path.join(__dirname, 'template.html');

async function deleteFolder() {
  try {
    await fs.promises.access(resultFolderPath);
    await fs.promises.rm(resultFolderPath, {recursive: true});
  } catch (err) {
    return false;
  }
}

async function createFolder() {
  try {
    await fs.promises.mkdir(resultFolderPath, {recursive: true});
    await fs.promises.mkdir(resultAssetsPath, {recursive: true});
  } catch (err) {
    throw err;
  }
}

async function copyAssetsFiles(sourcePath, destinationPath) {
  try {
    const files = await fs.promises.readdir(sourcePath,  { withFileTypes: true });
    console.log("copy file or folder");
    console.log(files);
    files.forEach(file => {
      if (file.isDirectory()) {
        fs.promises.mkdir(path.resolve(destinationPath, file.name), {recursive: true});
        copyAssetsFiles(
          path.resolve(sourcePath, file.name),
          path.resolve(destinationPath, file.name)
        );
      } else if (file.isFile()) {
        const sourceFilePath = path.resolve(sourcePath, file.name);
        const destinationFilePath = path.resolve(destinationPath, file.name);
        fs.promises.copyFile(sourceFilePath, destinationFilePath);
      }
    });

  } catch (err) {
    throw err;
  }
}

async function buildPage() {
  try {
    await deleteFolder();
    await createFolder();
    await copyAssetsFiles(assetsPath, resultAssetsPath);
  } catch (err) {
    console.log("main err : " + err);
  }
}

buildPage();