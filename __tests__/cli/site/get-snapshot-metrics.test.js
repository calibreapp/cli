import {
  runCLI,
  setupIntegrationServer,
  teardownIntegrationServer
} from '../../utils'

import snapshotMetrics from '../../fixtures/snapshotMetrics-no-snapshot.json'

describe('snapshot metrics', () => {
  beforeAll(() => setupIntegrationServer(snapshotMetrics))
  afterAll(() => teardownIntegrationServer())

  test('returns no snapshot error', async () => {
    const out = await runCLI({
      args: 'site get-snapshot-metrics --site=test --snapshot=1000'
    })
    expect(out).toMatchSnapshot()
  })
})
