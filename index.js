const chalk = require('chalk')

if (!process.env.CALIBRE_API_TOKEN) {
  console.log(
    chalk.grey(
      'Please set CALIBRE_API_TOKEN as an environment variable. Create your token via the team API tokens page, or see calibreapp.com/docs/api/tokens for help.'
    ),
    chalk.blue(`${process.env.CALIBRE_HOST}/home`)
  )
  process.exit()
}

const Site = require('./src/api/site')
const Snapshot = require('./src/api/snapshot')
const Test = require('./src/api/test')
const TestProfile = require('./src/api/test-profile')
const Agent = require('./src/api/location')

module.exports = {
  Site,
  Snapshot,
  Test,
  TestProfile,
  Agent
}
