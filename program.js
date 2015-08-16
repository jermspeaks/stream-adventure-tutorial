var concat = require('concat-stream');

function reverse(s) {
  return s.split('').reverse().join('');
}

var concatStream = concat(function(stringBuffer) {
  console.log(reverse(stringBuffer.toString()));
  // return reverse(stringBuffer.toString());
});

process.stdin
  .pipe(concatStream)
  // .pipe(process.stdout)
;
