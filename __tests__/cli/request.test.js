const {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} = require('../utils')
const site = require('../fixtures/site.json')

describe('request', () => {
  beforeAll(() => setupIntegrationServer(site))
  afterAll(() => teardownIntegrationServer())

  test('missing query argument', async () => {
    const out = await runCLI({ args: 'request', testForError: true })
    expect(out).toMatchSnapshot()
  })

  test('returns response', async () => {
    const slug = 'calibre'
    const out = await runCLI({
      args: `request --query='query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}' --slug=${slug}`
    })
    expect(out).toMatchSnapshot()
  })
})
