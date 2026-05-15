import { humaniseError, formatJsonError } from '../../src/utils/api-error'

import erroredSite from '../fixtures/createSiteError.json'

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

  it('formatJsonError outputs structured JSON to stderr', () => {
    const original = console.error
    const calls = []
    console.error = (...args) => calls.push(args)
    formatJsonError({ message: 'Something went wrong' })
    console.error = original
    expect(calls).toEqual([
      [JSON.stringify({ error: 'Something went wrong' })]
    ])
  })
})
