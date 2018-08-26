const chalk = require('chalk')

module.exports = score => {
  if (score >= 80) return chalk.green.bold(score)
  if (score > 60 && score < 80) return chalk.yellow.bold(score)
  if (score <= 60) return chalk.red.bold(score)
}
