const fs = require('fs');
const path = require('path');

const resultFolderPath = path.join(__dirname, 'project-dist');

const assetsPath = path.join(__dirname, 'assets');
const resultAssetsPath = path.join(resultFolderPath, 'assets');

const componentsPath = path.join(__dirname, 'components');
const resultComponentsPath = path.join(resultFolderPath, 'components');

const stylesPath = path.join(__dirname, 'styles');
const resultStylesPath = path.join(resultFolderPath, 'style.css');


const templateHtmlPath = path.join(__dirname, 'template.html');

