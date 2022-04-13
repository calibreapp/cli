#!/usr/bin/env node

import { Test, Agent } from 'calibre'

const createTest = async () => {
  const url = 'https://calibreapp.com'
  const locations = await Agent.list()

  locations.map(async location => {
    // Create the test
    try {
      const { formattedTestUrl } = await Test.create({
        url,
        location: location.tag
      })

      console.log(
        `Created test in ${location.emoji}  ${location.name}: ${formattedTestUrl}`
      )
    } catch (e) {
      console.error(e)
    }
  })
}

createTest()
