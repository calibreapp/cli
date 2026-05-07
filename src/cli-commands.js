import * as Request from './cli/request.js'
import * as Site from './cli/site.js'
import * as Synthetic from './cli/synthetic.js'
import * as Deploy from './cli/deploy.js'
import * as Crux from './cli/crux.js'
import * as Rum from './cli/rum.js'
import * as Team from './cli/team.js'
import * as Test from './cli/test.js'
import * as Token from './cli/token.js'

import * as MetricList from './cli/synthetic/metric-list.js'
import * as Connections from './cli/synthetic/connections.js'
import * as Devices from './cli/synthetic/devices.js'
import * as Locations from './cli/synthetic/locations.js'

import { deprecatedHandler } from './utils/deprecation.js'

const deprecatedCommands = [
  {
    command: 'connection-list',
    describe: false,
    builder: Connections.builder,
    handler: deprecatedHandler(
      'connection-list',
      'synthetic connections',
      Connections.handler
    )
  },
  {
    command: 'device-list',
    describe: false,
    builder: Devices.builder,
    handler: deprecatedHandler(
      'device-list',
      'synthetic devices',
      Devices.handler
    )
  },
  {
    command: 'location-list',
    describe: false,
    builder: Locations.builder,
    handler: deprecatedHandler(
      'location-list',
      'synthetic locations',
      Locations.handler
    )
  },
  {
    command: 'metric-list',
    describe: false,
    builder: MetricList.builder,
    handler: deprecatedHandler(
      'metric-list',
      'synthetic metric-list',
      MetricList.handler
    )
  }
]

const commands = [
  Site,
  Synthetic,
  Deploy,
  Crux,
  Rum,
  Test,
  Team,
  Token,
  Request,
  ...deprecatedCommands
]

export default commands
