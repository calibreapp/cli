const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')
const listPages = require('../../fixtures/listPages.json')

describe('site snapshots', () => {
  beforeAll(() => setupIntegrationServer(listPages))
  afterAll(() => teardownIntegrationServer())

  it('lists all snapshots', () => {
    return runCLI({
      args: 'site pages --site=test'
    }).then(stdout => {
      expect(stdout).toMatchSnapshot()
    })
  })
})
