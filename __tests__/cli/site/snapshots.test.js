const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')
const listSnapshots = require('../../fixtures/listSnapshots.json')

describe('site snapshots', () => {
  beforeAll(() => setupIntegrationServer(listSnapshots))
  afterAll(() => teardownIntegrationServer())

  it('lists all snapshots', () => {
    return runCLI({
      args: 'site snapshots --site=test'
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })
})
