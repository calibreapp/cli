import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listSnapshots from '../../fixtures/listSnapshots.json'

describe('synthetic snapshots', () => {
  beforeAll(async () => await setupIntegrationServer(listSnapshots))
  afterAll(async () => await teardownIntegrationServer())

  test('lists all snapshots', async () => {
    const out = await runCLI({
      args: 'synthetic snapshots --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
