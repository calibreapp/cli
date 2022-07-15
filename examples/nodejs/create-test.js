#!/usr/bin/env node

import { Test } from 'calibre'

const createTest = async () => {
  // Required
  const url = 'https://calibreapp.com/cli'
  const location = 'Sydney'

  // Optional
  const device = 'iPhone12'
  const connection = 'LTE'
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
  const { formattedTestUrl } = await Test.create({
    url,
    location,
    device,
    connection,
    cookies,
    headers,
    isPrivate
  })

  // Print the test URL
  console.log(`Test created: ${formattedTestUrl}`)

  // Optionally wait for the test complete
  const results = await Test.waitForTest(uuid)

  // Output the formatted JSON response
  console.log(JSON.stringify(results, null, 2))
}

createTest()
