var jsonstream = require('JSONStream')
var validator = require('activitystreams.validator')
var transform = require('stream-transform')

process.stdin
.pipe(transform.compose(
  jsonstream.parse(),
  transform.map(validator.validate)
))
.on('end', function () {
  process.exit()
})

