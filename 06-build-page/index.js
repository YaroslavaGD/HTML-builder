const fs = require('fs');
const path = require('path');

const resultFolderPath = path.join(__dirname, 'project-dist');

const assetsPath = path.join(__dirname, 'assets');
const resultAssetsPath = path.join(resultFolderPath, 'assets');


const stylesPath = path.join(__dirname, 'styles');
const resultStylesPath = path.join(resultFolderPath, 'style.css');


const componentsPath = path.join(__dirname, 'components');
const templateHtmlPath = path.join(__dirname, 'template.html');
const resultHtmlPath = path.join(resultFolderPath, 'index.html');

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

async function mergeStyles() {
  try {
    const resultFile = fs.createWriteStream(resultStylesPath);
    const files = await fs.promises.readdir(stylesPath, { withFileTypes: true });

    files.forEach(file => {
      if (file.isFile()) {
        let filePath = path.resolve(stylesPath, file.name);
        let fileName = path.basename(filePath);
        let fileExtension = path.extname(filePath);

        if (fileExtension === '.css') {
          const sourceFile = fs.createReadStream(
            path.resolve(stylesPath, fileName)
          );
  
          sourceFile.on('data', data => {
            resultFile.write(data.toString() + '\n');
          });
        }
      }
    });
  } catch (err) {
    throw err;
  }
}

async function createIndexHTML() {
  const resultHtml = fs.createWriteStream(resultHtmlPath, 'utf-8');
  const files = await fs.promises.readdir(componentsPath, {withFileTypes: true});

  const componentsData = [];

  for (let file of files) {
    const filePath = path.join(__dirname, 'components', file.name);
    let fileName = path.basename(filePath);
    let fileExtension = path.extname(filePath);

    if (fileExtension === '.html') {
      const componentName = fileName.replace(fileExtension, '');
      const componentValue = (await fs.promises.readFile(filePath)).toString();

      componentsData.push({
        name: componentName,
        value: componentValue
      });
    }
  }

  const templateHtml = (await fs.promises.readFile(templateHtmlPath)).toString();
  let currentTemplateHtml = templateHtml;

  componentsData.forEach(component => {
    currentTemplateHtml = currentTemplateHtml.replaceAll(`{{${component.name}}}`, component.value);
  });

  resultHtml.write(currentTemplateHtml, 'utf-8');
}

async function buildPage() {
  try {
    await deleteFolder();
    await createFolder();
    copyAssetsFiles(assetsPath, resultAssetsPath);
    mergeStyles();
    createIndexHTML();
  } catch (err) {
    console.log(err);
  }
}

buildPage();