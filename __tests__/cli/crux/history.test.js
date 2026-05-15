import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import cruxHistory from '../../fixtures/cruxHistory.json'

describe('crux history', () => {
  beforeAll(async () => await setupIntegrationServer(cruxHistory))
  afterAll(async () => await teardownIntegrationServer())

  test('displays crux history', async () => {
    const out = await runCLI({
      args: 'crux history --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
