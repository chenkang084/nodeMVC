const fs = require('fs');
const path = require('path');

const file = path.resolve('D', '/test/a.log');
// const file2 = path.resolve('D', '/test/a2.log');

// fs.readFile(file2, (err, data) => {
//   console.log(data.length);
// });

fs.open(file, 'r', (err, fd) => {
  const buf = new Buffer(1024);
  fs.read(fd, buf, 0, 1024, 0, (_err, bytesRead, buf2) => {
    if (_err) console.log(_err);
    console.log(buf2.slice(0, bytesRead).toString());
  });
});

// fs.readFile(file, (err, data) => {
//   if (err) throw err;
//   console.log(data.length);
// });

// fs.open(file, "r", (err, fd) => {
//   let buffer = new Buffer(1024 * 16);
//   fs.read(fd, buffer, 0, 1024 * 16, 0, (err, bytesRead, buf) => {
//     fs.open(file2, "w", (err, fd2) => {
//       fs.write(fd2, buf.toString(), 0, "utf8", (err, written, str) => {
//         console.log("ok");
//       });
//     });
//   });
// });
