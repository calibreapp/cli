const filesize = require('./filesize')
const duration = require('./duration')
const gradeFormatter = require('./grade-score')
const milliunit = require('./milliunit')

const format = ({ formatter, value }) => {
  switch (formatter) {
    case 'humanDuration':
      return duration(value)
    case 'fileSize':
      return filesize(value)
    case 'milliunit':
      return milliunit(value)
    default:
      return value
  }
}

module.exports = {
  format,
  filesize,
  duration,
  gradeFormatter,
  milliunit
}
