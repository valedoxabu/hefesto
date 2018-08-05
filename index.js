#!/usr/bin/env node
const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const project = require('./tools/build');
const build = require('./tools/build/template');

// Para colorir a mensagem no prompt de comando
const chalk = require('chalk');

let cmdValue;

const TEMPLATES = fs.readdirSync(`${__dirname}/app/templates`);
const TEMPLATES_DIR = `${__dirname}/app/templates`;
const CURR_DIR = process.cwd();

program
  .arguments('<cmd>')
  .option('-c, --component <component>', 'Create a new component')
  .option('-t, --type <type>', 'Choose the file type')
  .action(function(cmd) {
    cmdValue = cmd;

    switch (cmd) {
      case 'init':
        co(function*() {
          const projectName = yield prompt(chalk.cyan.bold('Project Name: '));
          project.createFolder(CURR_DIR, projectName);

          console.log(
            `Atual: ${CURR_DIR}/${projectName}`,
            `Template: ${TEMPLATES_DIR}`
          );

          build.createDirectoryContents(
            `${TEMPLATES_DIR}`,
            `${CURR_DIR}/${projectName}`
          );

          console.log(
            chalk`{green Projeto {bold ${projectName}} criado com sucesso!}`
          );
          process.exit(1);
        });

        break;

      case 'generate':
      case 'g':
        project.create(program);
        break;

      default:
        break;
    }
  })
  .parse(process.argv);

if (typeof cmdValue === 'undefined') {
  console.error(chalk.red('Nenhum comando válido digitado.'));
  process.exit(1);
}
