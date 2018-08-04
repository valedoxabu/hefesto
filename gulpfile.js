const gulp = require('gulp');
const fs = require('fs');
const concat = require('gulp-concat');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const argv = require('yargs').argv;

const plumberErrorHandler = {
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Olha o xabu: <%= error.message %>'
  })
};

const generateTask = () => {
  console.log(argv);
  console.log('Esse ====>' + argv.componente);

  createFolder(`./components/${argv.componente}`);

  // Para criar o all.sass na pasta
  createFile(
    'all.sass',
    `@import "./${argv.componente}.sass"`,
    `./components/${argv.componente}`
  );

  createFile(
    `${argv.componente}.sass`,
    `$hello = ${argv.componente}`,
    `./components/${argv.componente}`
  );
};

const createFolder = path => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

const createFile = (file, content, path = '.') => {
  fs.writeFile(`${path}/${file}`, content, function(error) {
    if (error) {
      return console.log(error);
    }

    console.log('The file was saved!');
  });
};

gulp.task('generate', generateTask);
gulp.task('g', generateTask);

gulp.task('default', ['g']);
