const fs = require('fs');
const chalk = require('chalk');

module.exports = {
  create(arguments) {
    console.log('Esse ====>' + arguments.component);

    this.createFolder(`./components/${arguments.component}`);

    // Para criar o all.sass na pasta
    this.createFile(
      'all.sass',
      `@import "./${arguments.component}.sass"`,
      `./components/${arguments.component}`
    );

    this.createFile(
      `${arguments.component}.sass`,
      `$hello = ${arguments.component}`,
      `./components/${arguments.component}`
    );
  },

  createFolder(path) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    } else {
      console.error(chalk.yellow('O componente já existe.'));
      return;
    }
  },

  createFile(file, content = '', path = '.') {
    if (!file) {
      console.error(chalk.red('Digite um nome para o arquivo.'));
      return;
    }

    fs.writeFile(`${path}/${file}`, content, function(error) {
      if (error) {
        return console.log(chalk.red(error));
      }
    });
  }
};

// const createFolder = path => {
//   if (!fs.existsSync(path)) {
//     fs.mkdirSync(path);
//   }
// };

// const createFile = (file, content, path = '.') => {
//   fs.writeFile(`${path}/${file}`, content, function(error) {
//     if (error) {
//       return console.log(error);
//     }

//     console.log('The file was saved!');
//   });
// };
