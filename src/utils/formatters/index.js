import filesize from './filesize'
import duration from './duration'
import gradeFormatter from './grade-score'
import milliunit from './milliunit'

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
