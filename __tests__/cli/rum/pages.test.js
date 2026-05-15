import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import rumPages from '../../fixtures/rumPages.json'

describe('rum pages', () => {
  beforeAll(async () => await setupIntegrationServer(rumPages))
  afterAll(async () => await teardownIntegrationServer())

  test('displays rum pages', async () => {
    const out = await runCLI({
      args: 'rum pages --site=test'
    })
    expect(out).toMatchSnapshot()
  })
})
