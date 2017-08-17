const fs = require('fs');
const path = require('path');

const file = path.resolve('D', '/test/a.log');
// let file2 = path.resolve("D", "/test/a2.log");
const chokidar = require('chokidar');

const log = console.log.bind(console);
let start = 0;
let fileLength = 0;
let _fd;
const BUFFER_SIZE = 521;

fs.open(file, 'r', (err, fd) => {
  if (err) console.log(err);
  _fd = fd;
  fs.fstat(fd, (_err, stats) => {
    if (_err) console.log(_err);
    fileLength = stats.size;

    console.log(fileLength);

    start = fileLength;

    // readFile(_fd, () => {
    //   // console.log(buf.toString());
    // });
  });
});

const readFile = (fd, cb) => {
  fs.read(
    fd,
    new Buffer(BUFFER_SIZE),
    0,
    BUFFER_SIZE,
    start,
    (err, bytesRead, buf) => {
      start += bytesRead;

      cb(bytesRead, buf);
    }
  );
};

const watcher = chokidar.watch(file, {
  /* eslint-disable no-useless-escape */
  ignored: /(^|[\/\\])\../,
  persistent: true
  /* eslint-disable no-useless-escape */
});

watcher.on('change', (_path) => {
  log(`File ${_path} has been changed`);
  readFile(_fd, (bytesRead, buf) => {
    console.log(buf.slice(0, bytesRead).toString());
  });
});
