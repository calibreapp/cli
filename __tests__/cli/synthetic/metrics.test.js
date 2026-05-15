import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import timeSeriesMetrics from '../../fixtures/timeSeriesMetrics.json'
describe('synthetic metrics', () => {
  beforeAll(async () => await setupIntegrationServer(timeSeriesMetrics))
  afterAll(async () => await teardownIntegrationServer())
  test('lists metrics', async () => {
    expect(await runCLI({args: 'synthetic metrics --site=test'})).toMatchSnapshot()
  })
})
