var spawn = require('child_process').spawn,
  duplexer = require('duplexer');

module.exports = function(cmd, args) {
  var stream = spawn(cmd, args);
  return duplexer(stream.stdin, stream.stdout);
}