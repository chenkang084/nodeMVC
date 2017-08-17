const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const log = console.log.bind(console);
const file = path.resolve('D', '/test/a.log');
let position = 0;
const CHUNK_SIZE = 16 * 1024;
let _fd;

function tailf(filename, delay) {
  // 每次读取文件块大小，16K
  const CHUNK_SIZE = 16 * 1024;
  // 打开文件，获取文件句柄
  const fd = fs.openSync(filename, 'r');
  // 文件开始位置
  //   let position = 0;
  // 循环读取
  const loop = () => {
    const buf = new Buffer(CHUNK_SIZE);
    const bytesRead = fs.readSync(fd, buf, 0, CHUNK_SIZE, position);
    // 实际读取的内容长度以 bytesRead 为准，并且更新 position 位置
    position += bytesRead;
    process.stdout.write(buf.slice(0, bytesRead));

    if (bytesRead < CHUNK_SIZE) {
      // 如果当前已到达文件末尾，则先等待一段时间再继续
      //   setTimeout(loop, delay);

    } else {
      loop();
    }
  };
  loop();
}

const loopFile = (onError, onData) => {
  const buf = new Buffer(CHUNK_SIZE);
  const fd = fs.openSync(file, 'rs+');
  const bytesRead = fs.readSync(fd, buf, 0, CHUNK_SIZE, position);
  // 实际读取的内容长度以 bytesRead 为准，并且更新 position 位置
  position += bytesRead;
  //   process.stdout.write();
  console.log(buf.slice(0, bytesRead).toString());
  if (bytesRead < CHUNK_SIZE) {
    // 如果当前已到达文件末尾，则先等待一段时间再继续
    //   setTimeout(loop, delay);
    // console.log('loop finished')

  } else {
    loopFile();
  }
};

tailf(file, 100);
const watcher = chokidar.watch(file, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher.on('change', (path) => {
  log(`File ${path} has been changed`);
  loopFile(
    () => {},
    (data) => {
      process.stdout.write(data);
    }
  );
});
