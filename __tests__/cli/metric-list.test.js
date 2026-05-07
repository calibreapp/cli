import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../utils'

import listMetrics from '../fixtures/listMetrics.json'

describe('metric-list', () => {
  beforeAll(async () => await setupIntegrationServer(listMetrics))
  afterAll(async () => await teardownIntegrationServer())

  test('lists metrics', async () => {
    const out = await runCLI({
      args: 'metric-list'
    })
    expect(out).toMatchSnapshot()
  })

  test('returns json', async () => {
    const out = await runCLI({
      args: 'metric-list --json'
    })
    const parsed = JSON.parse(out)
    expect(parsed).toHaveLength(2)
    expect(parsed[0].value).toBe('first-contentful-paint')
  })

  test('does not show a deprecation warning', async () => {
    const stderr = await runCLI({
      args: 'metric-list',
      testForError: true
    })
    expect(stderr).not.toContain('[calibre:deprecated]')
  })
})
