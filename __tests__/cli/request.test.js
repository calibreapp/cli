import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../utils'

import site from '../fixtures/site.json'

describe('request', () => {
  beforeAll(async () => await setupIntegrationServer(site))
  afterAll(async () => await teardownIntegrationServer())

  test('missing query argument', async () => {
    const out = await runCLI({ args: 'request', testForError: true })
    expect(out).toMatchSnapshot()
  })

  test('returns response', async () => {
    const slug = 'calibre'
    const query =
      'query GetSite($slug: String!) {organisation{site(slug: $slug){slug}}}'
    const args = `request --slug=${slug} --query="${query}"`

    const out = await runCLI({
      args
    })
    expect(out).toMatchSnapshot()
  })
})
