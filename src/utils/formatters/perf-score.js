const chalk = require('chalk')

module.exports = score => {
  let grade = 'F'
  if (score > 20) grade = 'D'
  if (score > 40) grade = 'C'
  if (score > 60) grade = 'B'
  if (score > 80) grade = 'A'

  if (score >= 80) return chalk.green.bold(grade)
  if (score > 60 && score < 80) return chalk.yellow.bold(grade)
  if (score <= 60) return chalk.red.bold(grade)
}
