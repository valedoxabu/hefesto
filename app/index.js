const fs = require('fs');
const chalk = require('chalk');

module.exports = {
  create(arguments) {
    const component = arguments.component || '';

    if (component) {
      this.createFolder(`./components/${component}`);

      // Para criar o all.sass na pasta
      this.createFile(
        'all.sass',
        `@import "./${component}.sass"`,
        `./components/${component} \n`
      );

      this.createFile(`${component}.sass`, '', `./components/${component}`);

      this.readFile(`${component}.sass`, `./components/${component}`);

      // Para importar o novo arquivo gerado
      this.writeFile(
        `all.sass`,
        `\n@import "./${component}/all.sass"`,
        `./components`
      );
    }
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
  },

  readFile(file, path = '.') {
    fs.readFile(`${path}/${file}`, 'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  },

  writeFile(file, content = '', path = '.') {
    fs.appendFile(
      `${path}/${file}`,
      content,
      'utf8',
      function(err) {
        if (err) {
          return console.log(err);
        }

        console.log('The file was saved!');
      },
      { flags: 'a+' }
    );
  }
};
