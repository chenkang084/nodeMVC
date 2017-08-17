const shell = require('shelljs');

export default function exceShell(cmd, cb) {
  shell.exec(cmd, (code, stdout, stderr) => {
    cb(code, stdout, stderr);
  });
}
