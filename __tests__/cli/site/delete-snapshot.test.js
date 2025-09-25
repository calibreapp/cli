import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import deleteSnapshot from '../../fixtures/deleteSnapshot.json'

describe('site delete-snapshot', () => {
  beforeAll(async () => await setupIntegrationServer(deleteSnapshot))
  afterAll(async () => await teardownIntegrationServer())

  test('requires id', async () => {
    const out = await runCLI({
      args: 'site delete-snapshot --site=test',
      testForError: true
    })
    expect(out).toMatchSnapshot()
  })

  test('deletes snapshot', async () => {
    const out = await runCLI({
      args: 'site delete-snapshot --site=test --id=1',
      testForError: true
    })
    expect(out).toMatchSnapshot()
  })
})
