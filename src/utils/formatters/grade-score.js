const chalk = require('chalk')

module.exports = score => {
  if (score >= 90) return chalk.green.bold(score)
  if (score > 50 && score < 90) return chalk.yellow.bold(score)
  if (score <= 50) return chalk.red.bold(score)
}
