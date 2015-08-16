var through2 = require('through2'),
  split = require('split'),
  lineCounter = 0;

process.stdin
  .pipe(split())
  .pipe(through2(function (line, _, next) {
    if (lineCounter % 2 == 1) {
      console.log(line.toString().toUpperCase());
    } else {
      console.log(line.toString().toLowerCase());
    }
    lineCounter++;
    next();
  }))
  .pipe(process.stdout)
;