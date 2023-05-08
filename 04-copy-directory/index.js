const { stdin, stdout} = require("process");
const fs = require('fs');
const path = require('path');

// создаем папку, если нужно
fs.mkdir(
  path.join(__dirname, 'files-copy'),
  {recursive: true},
  err => {
    if (err) throw new Error("Папка files-copy уже существует или другая ошибка");
  
    console.log('Папка files-copy создана');
  }
);

// удаляем то что раньше там лежало, если там что-то было
fs.promises.readdir(
  path.join(__dirname, 'files-copy')
).then( files => {
  files.forEach(file => {
    fs.unlink(
      path.join(__dirname, 'files-copy', file),
      err => {
        if (err) throw err;
      }
    );
  })
});

// копируем все файлы из исходной папки
fs.promises.readdir(
  path.join(__dirname, 'files')
).then( files => {
  files.forEach(file => {
    fs.promises.copyFile(
      path.join(__dirname,'files', file),
      path.join(__dirname, 'files-copy', file)
    );
  });

});
