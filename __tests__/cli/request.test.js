import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../utils'

import site from '../fixtures/site.json'

describe('request', () => {
  beforeAll(() => setupIntegrationServer(site))
  afterAll(() => teardownIntegrationServer())

  test('missing query argument', async () => {
    const out = await runCLI({ args: 'request', testForError: true })
    expect(out).toMatchSnapshot()
  })

  test('returns response', async () => {
    const slug = 'calibre'
    // eslint-disable-next-line no-useless-escape
    const query = 'query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}'
    const args = `request --slug=${slug} --query="${query}"`

    const out = await runCLI({
      args
    })
    expect(out).toMatchSnapshot()
  })
})
