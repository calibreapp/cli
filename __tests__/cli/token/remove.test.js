const Configstore = require('configstore')
const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../../utils')

const pkg = require('../../../package.json')
const config = new Configstore(pkg.name)

describe('remove token', () => {
  beforeAll(() => setupIntegrationServer())
  afterAll(() => teardownIntegrationServer())

  test('is removed', async () => {
    config.set('token', '123')
    const out = await runCLI({ args: 'token remove', testForError: true })
    expect(out).toMatchSnapshot()
  })

  test('no token to remove', async () => {
    const out = await runCLI({ args: 'token remove', testForError: true })
    expect(out).toMatchSnapshot()
  })
})
