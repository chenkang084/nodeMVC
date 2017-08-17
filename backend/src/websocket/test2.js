const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const file = path.resolve('D', '/test/a.log');
const log = console.log.bind(console);
let start = 0;

const readLog = (file, callback) => {
  fs
    .createReadStream(file, {
      flags: 'r',
      fd: null,
      start: 0
    })
    .on('data', (chunk) => {
      callback(chunk);
    });
};

readLog(file, (chunk) => {
  start = chunk.length;
  console.log(chunk.toString());
});

const watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', path => log(`File ${path} has been added`))
  .on('change', (path) => {
    log(`File ${path} has been changed`);
    readLog(file, (chunk) => {
      start = Math.max(chunk.length, start);
      console.log(chunk.toString());
    });
  })
  .on('unlink', path => log(`File ${path} has been removed`));
