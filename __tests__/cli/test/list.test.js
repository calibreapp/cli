import {runCLI,setupIntegrationServer,teardownIntegrationServer} from '../../utils'
import testList from '../../fixtures/testList.json'
describe('test list', () => {
  beforeAll(async () => await setupIntegrationServer(testList))
  afterAll(async () => await teardownIntegrationServer())
  test('lists tests', async () => {
    expect(await runCLI({args: 'test list'})).toMatchSnapshot()
  })
})
