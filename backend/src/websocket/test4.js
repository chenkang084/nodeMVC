const fs = require('fs');
const path = require('path');
// const chokidar = require('chokidar');

// const log = console.log.bind(console);
const file = path.resolve('D', '/test/a.log');
const file2 = path.resolve('D', '/test/a3.log');

const bufferSize = 1024 * 16; // 16k
let position = 0;

const writeFile = (buf, _position) => {
  //   fs.open(file2, "w", (err, fd) => {
  //     fs.write(fd, buf.toString(), position, "utf8", (err, written, str) => {
  //       console.log(written);
  //     });
  //   });
  //   fs.writeFile(file2, buf.toString(), { encoding: "utf8" }, err => {
  //     console.log("write ok");
  //   });
  const write = fs.createWriteStream(file2, {
    flags: 'r+',
    defaultEncoding: 'utf8',
    // fd: null,
    // mode: 0o666,
    autoClose: true,
    start: _position
  });

  write.write(buf);
  write.end();
};

const start = new Date().getTime();
fs.open(file, 'r', (err, fd) => {
  fs.fstat(fd, (_err) => {
    if (_err) console.log(_err);
    console.log('fstat', new Date().getTime() - start);

    const loop = () => {
      const buffer = new Buffer(bufferSize);
      fs.read(fd, buffer, 0, bufferSize, position, (__err, bytesRead, buf) => {
        if (__err) console.log(__err);
        console.log('read file spent', new Date().getTime() - start, 's');

        writeFile(buf, position);

        position += bytesRead;

        if (bytesRead < bufferSize) {
          console.log('read the end line!');
        } else {
          loop();
        }
      });
    };

    loop();
  });
});
