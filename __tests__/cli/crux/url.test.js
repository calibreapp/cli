import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import cruxUrl from '../../fixtures/cruxUrl.json'

describe('crux url', () => {
  beforeAll(async () => await setupIntegrationServer(cruxUrl))
  afterAll(async () => await teardownIntegrationServer())

  test('displays crux url details', async () => {
    const out = await runCLI({
      args: 'crux url 123e4567-e89b-12d3-a456-426614174000 --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
