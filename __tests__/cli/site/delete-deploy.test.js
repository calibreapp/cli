import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import deleteDeploy from '../../fixtures/deleteDeploy.json'

describe('site delete-deploy', () => {
  beforeAll(async () => await setupIntegrationServer(deleteDeploy))
  afterAll(async () => await teardownIntegrationServer())

  test('requires uuid', async () => {
    const out = await runCLI({
      args: 'site delete-deploy --site=test',
      testForError: true
    })
    expect(out).toMatchSnapshot()
  })

  test('deletes deploy', async () => {
    const out = await runCLI({
      args: 'site delete-deploy --site=test --uuid=1',
      testForError: true
    })
    expect(out).toMatchSnapshot()
  })
})
