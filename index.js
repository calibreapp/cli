const apiToken = require('./src/utils/token')()

if (!apiToken) {
  throw new Error(
    'Use `calibre token set` or set CALIBRE_API_TOKEN as an environment variable with your API Token. See calibreapp.com/docs/api/tokens for help.'
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
const Deploy = require('./src/api/deploy')
const Integration = require('./src/api/integration')
const MetricBudget = require('./src/api/metric-budget')
const AgentSettings = require('./src/api/agent-settings')

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
  TimeSeries,
  Deploy,
  Integration,
  MetricBudget,
  AgentSettings
}
