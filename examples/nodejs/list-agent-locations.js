#!/usr/bin/env node

const { Agent } = require('calibre')

const listTestLocations = async () => {
  // Fetch the locations
  const locations = await Agent.list()

  console.log(locations)
}

listTestLocations()
