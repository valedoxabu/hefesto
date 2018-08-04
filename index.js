#!/usr/bin/env node
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const project = require('./app');

// Para colorir a mensagem no prompt de comando
const chalk = require('chalk');

let cmdValue;

program
  .arguments('<cmd>')
  .option('-c, --component <component>', 'Create a new component')
  .option('-t, --type <type>', 'Choose the file type')
  .action(function(cmd) {
    cmdValue = cmd;

    switch (cmd) {
      case 'init':
        co(function*() {
          const projectName = yield prompt('Project Name: ');

          console.log(
            chalk`{green Projeto {bold ${projectName}} criado com sucesso!}`
          );
          process.exit(1);
        });

        break;

      case 'generate':
      case 'g':
        project.create(program);
        project.createFile();
        break;

      default:
        break;
    }
  })
  .parse(process.argv);

if (typeof cmdValue === 'undefined') {
  console.error(chalk.red('Nenhum comando digitado.'));
  process.exit(1);
}
