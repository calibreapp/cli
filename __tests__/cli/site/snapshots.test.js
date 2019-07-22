const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')
const listSnapshots = require('../../fixtures/listSnapshots.json')

describe('site snapshots', () => {
  beforeAll(() => setupIntegrationServer(listSnapshots))
  afterAll(() => teardownIntegrationServer())

  test('lists all snapshots', async () => {
    const out = await runCLI({
      args: 'site snapshots --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
