#!/usr/bin/env node

const { Test } = require('calibre')

const createTest = async () => {
  const url = 'https://calibreapp.com/cli'
  const location = 'Sydney'
  const device = 'iPhone8'
  const connection = 'good3G'

  // Create the test
  const { uuid } = await Test.create({
    url,
    location,
    device,
    connection
  })

  console.log(`Test created, ID: ${uuid}`)

  // Wait for the test to be run
  const results = await Test.waitForTest(uuid)

  // Output the formatted JSON response
  console.log(JSON.stringify(results, null, 2))
}

createTest()
