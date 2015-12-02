var jsonstream = require('JSONStream')
var validator = require('activitystreams.validator')
var map = require('stream-transform').map

function exitOnError(stream) {
  stream.on('error', function (err) {
    console.error(err);
    process.exit(1)
  })
  return stream;
}

process.stdin
.pipe(exitOnError(jsonstream.parse()))
.pipe(exitOnError(map(validator.validate)))
.on('end', function () {
  process.exit()
})

