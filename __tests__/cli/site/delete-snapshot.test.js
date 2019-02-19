const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')
const deleteSnapshot = require('../../fixtures/deleteSnapshot.json')

describe('site delete-snapshot', () => {
  beforeAll(() => setupIntegrationServer(deleteSnapshot))
  afterAll(() => teardownIntegrationServer())

  test('requires id', () => {
    return runCLI({
      args: 'site delete-snapshot --site=test',
      testForError: true
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })

  it('deletes snapshot', () => {
    return runCLI({
      args: 'site delete-snapshot --site=test --id=1',
      testForError: true
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })
})
