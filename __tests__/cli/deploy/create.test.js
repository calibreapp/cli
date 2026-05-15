import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import createDeploy from '../../fixtures/createDeploy.json'

describe('deploy create', () => {
  beforeAll(async () => await setupIntegrationServer(createDeploy))
  afterAll(async () => await teardownIntegrationServer())

  test('creates deploy', async () => {
    const out = await runCLI({
      args: 'deploy create --site=test --revision=abc123def456'
    })
    expect(out).toMatchSnapshot()
  })
})
