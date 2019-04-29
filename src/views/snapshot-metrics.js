const chalk = require('chalk')
const dateFormat = require('date-fns/format')
const gradeTable = require('../views/grade-table')

const testTable = ({ test, testProfiles }) => {
  const testProfile = testProfiles.find(tp => tp.uuid == test.testProfile.uuid)

  return `
${chalk.bold(test.page.name)} ${chalk.grey(`(${test.page.url})`)}
Tested with: ${testProfile.name}

${gradeTable(test.measurements)}
  `
}

module.exports = ({ snapshot, testProfiles }) => {
  let intro = [
    chalk.bold(`Snapshot #${snapshot.iid}`),
    chalk.grey(dateFormat(snapshot.createdAt, 'h:mma D-MMM-YYYY'))
  ]

  const view = snapshot.tests.map(test => testTable({ test, testProfiles }))

  return `
${intro.join('\n')}

    ${view.join('\n\n')}

${chalk.bold(`View the full report ${snapshot.htmlUrl}`)}

To view all captured metrics of this test, re-run this command with the ${chalk.cyan(
    '--json'
  )} or ${chalk.cyan('--csv')} flag.

  `
}
