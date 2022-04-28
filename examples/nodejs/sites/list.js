#!/usr/bin/env node

import { Site } from 'calibre'

const listSites = async () => {
  // List the sites
  const sites = await Site.list()

  // Output the formatted JSON response
  console.log(JSON.stringify(sites, null, 2))
}

listSites()
