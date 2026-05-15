import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import rumConfig from '../../fixtures/rumConfig.json'

describe('rum config', () => {
  beforeAll(async () => await setupIntegrationServer(rumConfig))
  afterAll(async () => await teardownIntegrationServer())

  test('displays rum config', async () => {
    const out = await runCLI({
      args: 'rum config --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
