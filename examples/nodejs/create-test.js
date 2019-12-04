#!/usr/bin/env node

const { Test } = require('calibre')

const createTest = async () => {
  // Required
  const url = 'https://calibreapp.com/cli'
  const location = 'Sydney'

  // Optional
  const device = 'iPhone8'
  const connection = 'good3G'
  const isPrivate = false
  const cookies = [
    {
      name: 'app.uid',
      value: 'my-secret-tokens',
      domain: 'calibreapp.com',
      path: '/',
      secure: true,
      httpOnly: true
    }
  ]
  const headers = [
    {
      name: 'User-Agent',
      value: 'My Custom User Agent'
    }
  ]

  // Create the test
  const { uuid } = await Test.create({
    url,
    location,
    device,
    connection,
    cookies,
    headers,
    isPrivate
  })

  console.log(`Test created, ID: ${uuid}`)

  // Wait for the test to be run
  const results = await Test.waitForTest(uuid)

  // Output the formatted JSON response
  console.log(JSON.stringify(results, null, 2))
}

createTest()
