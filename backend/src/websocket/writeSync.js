const fs = require('fs');
const path = require('path');
// const chokidar = require('chokidar');

// const log = console.log.bind(console);
const file = path.resolve('D', '/test/a.log');
let position = 0;
// const CHUNK_SIZE = 16 * 1024;
// let _fd;

// const buf = new Buffer(CHUNK_SIZE);
const fd = fs.openSync(file, 'w');
let count = 0;
setInterval(() => {
  count += 1;

  const str = `${count.toString()}\n`;
  position += str.length;
  console.log(count);
  // buf[count] = count;
  fs.writeSync(fd, str, position, 'utf8');
}, 100);
