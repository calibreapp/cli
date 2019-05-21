const { humaniseError } = require('../../src/utils/api-error')

const erroredSite = require('../fixtures/createSiteError.json')

describe('apiError', () => {
  it('graphql', () => {
    expect(humaniseError(erroredSite.errors)).toMatchSnapshot()
  })

  it('messages', () => {
    const error = [{ message: 'First Expected Error Message' }]
    expect(humaniseError(error)).toMatchSnapshot()
  })

  it('message', () => {
    const error = { message: 'Expected Error Message' }
    expect(humaniseError(error)).toMatchSnapshot()
  })

  it('error', () => {
    expect(humaniseError(new Error('Expected Error'))).toMatchSnapshot()
  })

  it('error string', () => {
    expect(humaniseError('Error string')).toMatchSnapshot()
  })
})
