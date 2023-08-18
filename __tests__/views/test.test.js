import formatTest from '../../src/views/markdown'

import completedTest from '../fixtures/completedTest.json'
import erroredTest from '../fixtures/erroredTest.json'
import timeoutTest from '../fixtures/timeoutTest.json'
import incompleteTest from '../fixtures/incompleteTest.json'

describe('test', () => {
  it('completed', () => {
    const formattedTest = formatTest(completedTest.markdownReport)
    expect(formattedTest).toMatchSnapshot()
  })

  it('errored', () => {
    const formattedTest = formatTest(erroredTest.markdownReport)
    expect(formattedTest).toMatchSnapshot()
  })

  it('timeout', () => {
    const formattedTest = formatTest(timeoutTest.markdownReport)
    expect(formattedTest).toMatchSnapshot()
  })

  it('incomplete', () => {
    const formattedTest = formatTest(incompleteTest.markdownReport)
    expect(formattedTest).toMatchSnapshot()
  })
})
