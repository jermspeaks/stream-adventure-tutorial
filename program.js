var concat = require('concat-stream');
var crypto = require('crypto');
var zlib = require('zlib');
var tar = require('tar')


var cipherName = process.argv[2];
var passphrase = process.argv[3];

var parser = tar.Parse();
parser.on('entry', function(e) {
    if (e.type !== 'File') return;

    var cryptHash = crypto.createHash('md5', {
        encoding: 'hex'
    });

    e.pipe(cryptHash).pipe(concat(function(hash) {
      console.log(hash + ' ' + e.path);
    }));
});

process.stdin
  .pipe(crypto.createDecipher(cipherName, passphrase))
  .pipe(zlib.createGunzip())
  .pipe(parser)
;

