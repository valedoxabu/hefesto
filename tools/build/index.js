const fs = require('fs');
const chalk = require('chalk');

const project = {
  name: '',
  type: 'sass'
};

module.exports = {
  create(arguments) {
    const component = arguments.component || '';

    if (arguments.type) {
      project.type = arguments.type;
    }

    console.log(process.cwd());
    console.log(fs.readdirSync(`${__dirname}`));

    if (component) {
      this.createFolder(`./components`, component);

      // Para criar o all.sass na pasta
      this.createFile(
        '_all.sass',
        `@import "./_${component}.${project.type}"\n`,
        `./components/${component}`
      );

      this.createFile(
        `_${component}.${project.type}`,
        ` `,
        `./components/${component}`
      );

      // this.readFile(
      //   `_${component}.${project.type}`,
      //   `./components/${component}`
      // );

      // Para importar o novo arquivo gerado
      this.writeFile(
        `_all.sass`,
        `\n@import "./${component}/all.sass"`,
        `./components`
      );
    }
  },

  createFolder(path, name) {
    if (!fs.existsSync(`${path}/${name}`)) {
      fs.mkdirSync(`${path}/${name}`);
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

        console.log(`The ${file} was saved!`);
      },
      { flags: 'a+' }
    );
  }
};
