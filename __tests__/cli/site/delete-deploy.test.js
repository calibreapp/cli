const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')
const deleteDeploy = require('../../fixtures/deleteDeploy.json')

describe('site delete-deploy', () => {
  beforeAll(() => setupIntegrationServer(deleteDeploy))
  afterAll(() => teardownIntegrationServer())

  test('requires uuid', () => {
    return runCLI({
      args: 'site delete-deploy --site=test',
      testForError: true
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })

  it('deletes deploy', () => {
    return runCLI({
      args: 'site delete-deploy --site=test --uuid=1',
      testForError: true
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })
})
