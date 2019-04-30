const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')
const listDeploys = require('../../fixtures/listDeploys.json')

describe('site deploys', () => {
  beforeAll(() => setupIntegrationServer(listDeploys))
  afterAll(() => teardownIntegrationServer())

  it('lists all deploys', () => {
    return runCLI({
      args: 'site deploys --site=test'
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })
})
