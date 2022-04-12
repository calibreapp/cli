import * as cli from '../'

describe('Index', () => {
  test('should be able to resolve the same dependencies', () => {
    console.log(cli)
    expect(cli).toMatchSnapshot()
  })
})
