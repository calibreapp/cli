import * as ConnectionList from './cli/connection-list.js'
import * as DeviceList from './cli/device-list.js'
import * as LocationList from './cli/location-list.js'
import * as MetricList from './cli/metric-list.js'
import * as Request from './cli/request.js'
import * as Site from './cli/site.js'
import * as Test from './cli/test.js'
import * as Token from './cli/token.js'

const commands = [
  Site,
  Test,
  ConnectionList,
  DeviceList,
  LocationList,
  MetricList,
  Token,
  Request
]

export default commands
