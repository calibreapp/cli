import { styleText } from 'node:util'
import { format as dateFormat } from 'date-fns'

import gradeTable from '../views/grade-table.js'

const testTable = ({ test, testProfiles }) => {
  const testProfile = testProfiles.find(tp => tp.uuid == test.testProfile.uuid)

  return `
${styleText('bold', test.page.name)} ${styleText('gray', `(${test.page.url})`)}
Tested with: ${testProfile.name}

${gradeTable(test.measurements)}
  `
}

const view = ({ snapshot, testProfiles }) => {
  let intro = [
    styleText('bold', `Snapshot #${snapshot.iid}`),
    styleText('gray', dateFormat(new Date(snapshot.createdAt), 'h:mma d-MMM-yyyy'))
  ]

  const view = snapshot.tests.map(test => testTable({ test, testProfiles }))

  return `
${intro.join('\n')}

    ${view.join('\n\n')}

${styleText('bold', `View the full report ${snapshot.htmlUrl}`)}

To view all captured metrics of this test, re-run this command with the ${styleText('cyan',
    '--json'
  )} or ${styleText('cyan', '--csv')} flag.

  `
}

export default view
