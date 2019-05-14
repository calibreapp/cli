const formatTest = require('../../src/views/test')

const completedTest = require('../fixtures/completedTest.json')
const erroredTest = require('../fixtures/erroredTest.json')
const timeoutTest = require('../fixtures/timeoutTest.json')
const incompleteTest = require('../fixtures/incompleteTest.json')

describe('test', () => {
  it('completed', () => {
    const formattedTest = formatTest(completedTest)
    expect(formattedTest).toMatchSnapshot()
  })

  it('errored', () => {
    const formattedTest = formatTest(erroredTest)
    expect(formattedTest).toMatchSnapshot()
  })

  it('timeout', () => {
    const formattedTest = formatTest(timeoutTest)
    expect(formattedTest).toMatchSnapshot()
  })

  it('incomplete', () => {
    const formattedTest = formatTest(incompleteTest)
    expect(formattedTest).toMatchSnapshot()
  })
})
