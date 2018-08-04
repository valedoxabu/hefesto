#!/usr/bin/env node
const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');

program
  .arguments('<file>')
  .option('-u, --username <username>', 'The user to authenticate as')
  .option('-p, --password <password>', "The user's password")
  .action(function(file) {
    co(function*() {
      const username = yield prompt('username: ');
      const password = yield prompt.password('password: ');
      console.log('user: %s pass: %s file: %s', username, password, file);
    });
  })
  .parse(process.argv);
