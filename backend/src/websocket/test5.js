const fs = require('fs');
const path = require('path');

const file = path.resolve('D', '/test/a5.log');

// fs.open(file,'w',0o666,(err,fd)=>{
//     console.log('ok')
// })

// let write = fs.createWriteStream(file, {
//   flags: "w",
//   defaultEncoding: "utf8",
// //   fd: null,
// //   mode: 0o666,
//   autoClose: true,
//   start:0
// });

// write.write("1");

// write.end();

fs.writeFile(file, 'abc', 0, 'utf8', (err) => {
  if (err) console.log(err);
  console.log('ok');
});
