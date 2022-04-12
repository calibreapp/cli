import chalk from 'chalk'
import { format as dateFormat } from 'date-fns'

import gradeTable from '../views/grade-table.js'

const testTable = ({ test, testProfiles }) => {
  const testProfile = testProfiles.find(tp => tp.uuid == test.testProfile.uuid)

  return `
${chalk.bold(test.page.name)} ${chalk.grey(`(${test.page.url})`)}
Tested with: ${testProfile.name}

${gradeTable(test.measurements)}
  `
}

const view = ({ snapshot, testProfiles }) => {
  let intro = [
    chalk.bold(`Snapshot #${snapshot.iid}`),
    chalk.grey(dateFormat(new Date(snapshot.createdAt), 'h:mma d-MMM-yyyy'))
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

export default view
