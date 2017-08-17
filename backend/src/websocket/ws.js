const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');

const file = path.resolve('D', '/test/a.log');
const log = console.log.bind(console);

let socket;
let start = 0;
let hasReadFile;
let io;

const readLog = (_file, callback) => {
  fs
    .createReadStream(_file, {
      flags: 'r',
      start: 0
    })
    .on('data', (chunk) => {
      callback(chunk);
    });
};

readLog(file, (chunk) => {
  start = chunk.length;
  hasReadFile = chunk.toString();
});

const watcher = chokidar.watch(file, {
  /* eslint-disable no-useless-escape */
  ignored: /(^|[\/\\])\../,
  persistent: true
  /* eslint-disable no-useless-escape */
});

watcher.on('change', (_path) => {
  log(`File ${_path} has been changed`);
  readLog(file, (chunk) => {
    if (start > 0) start += chunk.length;
    const msg = chunk.toString();
    console.log('msg read ok');
    io.emit('message', {
      username: socket.username,
      message: msg
    });
  });
});

exports.ws = function ws(_io) {
  _io.on('connection', (_socket) => {
    console.log('ws connected!');

    socket = _socket;
    io = _io;

    _socket.on('initData', () => {
      _io.emit('initBack', {
        username: socket.username,
        message: hasReadFile
      });
    });
  });
};
