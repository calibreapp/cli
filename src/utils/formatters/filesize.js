const humanize = require('humanize')

module.exports = bytes => humanize.filesize(bytes)
