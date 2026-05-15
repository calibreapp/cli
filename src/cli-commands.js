import * as Request from './cli/request.js'
import * as Site from './cli/site.js'
import * as Synthetic from './cli/synthetic.js'
import * as Deploy from './cli/deploy.js'
import * as Crux from './cli/crux.js'
import * as Rum from './cli/rum.js'
import * as Team from './cli/team.js'
import * as Test from './cli/test.js'
import * as Token from './cli/token.js'
import * as MetricList from './cli/metric-list.js'

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
  MetricList
]

export default commands
