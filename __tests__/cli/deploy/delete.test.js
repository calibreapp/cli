import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import deleteDeploy from '../../fixtures/deleteDeploy.json'

describe('deploy delete', () => {
  beforeAll(async () => await setupIntegrationServer(deleteDeploy))
  afterAll(async () => await teardownIntegrationServer())

  test('deletes deploy', async () => {
    const out = await runCLI({
      args: 'deploy delete --site=test --uuid=1',
      testForError: true
    })
    expect(out).toMatchSnapshot()
  })
})
