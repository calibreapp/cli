import filesize from './filesize.js'
import duration from './duration.js'
import gradeFormatter from './grade-score.js'
import milliunit from './milliunit.js'

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

export { format, filesize, duration, gradeFormatter, milliunit }
