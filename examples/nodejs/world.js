#!/usr/bin/env node

const { Test, Agent } = require('calibre')

const createTest = async () => {
  const url = 'https://calibreapp.com/cli'

  const locations = await Agent.list()
  const tests = locations.map(async location => {
    // Create the test
    const { uuid } = await Test.create({
      url,
      location: location.tag
    })

    console.log('Created test in', location.emoji, location.name)

    return Test.waitForTest(uuid)
  })

  Promise.all(tests).then(result => {
    const fmp = result.metrics.find(
      metric => metric.name === 'first-meaningful-paint'
    )

    console.log(
      result.location.emoji,
      result.location.name,
      'first meaningful paint',
      fmp.value,
      'ms'
    )
  })
}

createTest()
