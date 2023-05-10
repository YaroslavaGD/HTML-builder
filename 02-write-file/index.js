const {stdin, stdout} = require("process");
const fs = require('fs');
const path = require('path');

const HI_STR = 'Hallo! Введите текст для записи: ';
const END_STR = '\nПроцесс записи завершен.\n';
const STOP_STR = 'exit';

const outputFile = fs.createWriteStream(
  path.join(__dirname, 'result.txt')
);

stdout.write(HI_STR);

stdin.on('data', data => {
  const dataStr = data.toString();

  if (dataStr.includes(STOP_STR)) {
    stdout.write(END_STR);
    process.exit();
  }

  outputFile.write(data);
});

process.on('SIGINT', () => {
  stdout.write(END_STR);
  process.exit();
});




