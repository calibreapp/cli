import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

const mockResponse = {
  data: {
    createTest: {
      uuid: 'test-uuid-123',
      formattedTestUrl: 'https://calibreapp.com/test/test-uuid-123'
    }
  }
}

describe('test create with blockedHosts', () => {
  beforeAll(async () => await setupIntegrationServer(mockResponse))
  afterAll(async () => await teardownIntegrationServer())

  test('should accept comma-separated blocked hosts', async () => {
    const out = await runCLI({
      args:
        'test create https://example.com --location=Sydney --blocked-hosts="*.google-analytics.com,*.facebook.com"'
    })
    expect(out).toMatchSnapshot()
  })

  test('should accept JSON array for blocked hosts', async () => {
    const out = await runCLI({
      args:
        'test create https://example.com --location=Sydney --blocked-hosts=\'["*.google-analytics.com","*.facebook.com"]\''
    })
    expect(out).toMatchSnapshot()
  })

  test('should work without blocked hosts', async () => {
    const out = await runCLI({
      args: 'test create https://example.com --location=Sydney'
    })
    expect(out).toMatchSnapshot()
  })
})
