import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import listDeploys from '../../fixtures/listDeploys.json'

describe('site deploys', () => {
  beforeAll(() => setupIntegrationServer(listDeploys))
  afterAll(() => teardownIntegrationServer())

  test('lists all deploys', async () => {
    const out = await runCLI({ args: 'site deploys --site=test' })
    expect(out).toMatchSnapshot()
  })
})
