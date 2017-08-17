const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const log = console.log.bind(console);
const file = path.resolve('D', '/test/a.log');
let position = 0;
const CHUNK_SIZE = 16 * 1024;
let _fd;

function tailf(filename, delay, onError, onData) {
  fs.open(filename, 'r', (err, fd) => {
    if (err) return onError(err);

    _fd = fd;

    fs.fstat(fd, (err, stats) => {
      if (err) return onError(err);

      position = stats.size;

      const loop = () => {
        const buf = new Buffer(CHUNK_SIZE);
        fs.read(fd, buf, 0, CHUNK_SIZE, position, (err, bytesRead, buf) => {
          if (err) return onError(err);

          position += bytesRead;
          onData(buf.slice(0, bytesRead));

          if (bytesRead < CHUNK_SIZE) {

            // setTimeout(loop, delay);
          } else {
            loop();
          }
        });
      };
      loop();
    });
  });
}

const loopFile = (onError, onData) => {
  const buf = new Buffer(CHUNK_SIZE);
  fs.read(_fd, buf, 0, CHUNK_SIZE, position, (err, bytesRead, buf) => {
    if (err) return onError(err);

    console.log(`before position=${position}`);
    position += bytesRead;
    console.log(`after position=${position}`);
    onData(buf.slice(0, bytesRead));

    if (bytesRead < CHUNK_SIZE) {

      // setTimeout(loop, delay);
    } else {
      loopFile();
    }
  });
};

tailf(
  file,
  100,
  () => {},
  (data) => {
    process.stdout.write(data);
  }
);

const watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('change', (path) => {
  log(`File ${path} has been changed`);
  // tailf(
  //   file,
  //   100,
  //   () => {},
  //   data => {
  //     process.stdout.write(data);
  //   }
  // );
  loopFile(
    () => {},
    (data) => {
      process.stdout.write(data);
    }
  );
});
