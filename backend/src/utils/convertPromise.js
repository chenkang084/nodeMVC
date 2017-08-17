const fs = require('fs');

const convertPromise = fn =>
  new Promise((resolve, reject) => {
    fn.call(fn, resolve, reject);
  });

const readFileFn = filename => (resolve, reject) => {
  fs.readFile(filename, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
};

Promise.all([
  convertPromise(readFileFn('../../README.md')),
  convertPromise(readFileFn('../../README.md'))
]).then((result) => {
  console.log(result);
});
