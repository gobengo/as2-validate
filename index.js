var jsonstream = require('JSONStream')
var through = require('through3')
var validator = require('activitystreams.validator')
var map = require('stream-transform').map

var ActivityToValidationResult = through.transform(function (a, enc, done) {
  try {
    done(null, validator.validate(a))
  } catch (e) {
    done(e)
  }  
}, null, { objectMode: true })

var Stringifier = through.transform(function transform(chunk, enc, done) {
  done(null, chunk.toString())  
})

function exitOnError(stream) {
  stream.on('error', function (err) {
    console.error(err);
    process.exit()
  })
  return stream;
}

process.stdin
.pipe(exitOnError(jsonstream.parse()))
.pipe(exitOnError(map(validator.validate)))
.pipe(exitOnError(Stringifier()))
.pipe(exitOnError(process.stdout))

