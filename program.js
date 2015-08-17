var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function(counter) {
  var countObj = {};
  var input = through(write, end);

  function write(row, _, next) {
    countObj[row.country] = (countObj[row.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(countObj);
    done();
  }

  return duplexer(input, counter);
};