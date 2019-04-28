if (!process.env.CALIBRE_API_TOKEN) {
  throw new Error(
    'Please set CALIBRE_API_TOKEN as an environment variable. Create your token via the team API tokens page, or see calibreapp.com/docs/api/tokens for help.'
  )
}

const Site = require('./src/api/site')
const Snapshot = require('./src/api/snapshot')
const Test = require('./src/api/test')
const TestProfile = require('./src/api/test-profile')
const Agent = require('./src/api/location')
const Page = require('./src/api/page')
const Connection = require('./src/api/connection')
const Device = require('./src/api/device')
const SnapshotMetrics = require('./src/api/snapshot-metrics')
const GraphQL = require('./src/api/graphql')
const TimeSeries = require('./src/api/time-series')

module.exports = {
  Site,
  Snapshot,
  Test,
  TestProfile,
  Agent,
  Page,
  Connection,
  Device,
  SnapshotMetrics,
  GraphQL,
  TimeSeries
}
