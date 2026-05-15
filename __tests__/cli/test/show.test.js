import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import testShow from '../../fixtures/testShow.json'
describe('test show', () => {
  beforeAll(async () => await setupIntegrationServer(testShow))
  afterAll(async () => await teardownIntegrationServer())
  test('shows test details', async () => {
    expect(await runCLI({args: 'test show test-1'})).toMatchSnapshot()
  })
})
