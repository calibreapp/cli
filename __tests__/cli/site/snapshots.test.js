import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listSnapshots from '../../fixtures/listSnapshots.json'

describe('site snapshots', () => {
  beforeAll(async () => await setupIntegrationServer(listSnapshots))
  afterAll(async () => await teardownIntegrationServer())

  test('lists all snapshots', async () => {
    const out = await runCLI({
      args: 'site snapshots --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
