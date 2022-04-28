#!/usr/bin/env node

import { Agent } from 'calibre'

const listTestLocations = async () => {
  // Fetch the locations
  const locations = await Agent.list()

  console.log(locations)
}

listTestLocations()
