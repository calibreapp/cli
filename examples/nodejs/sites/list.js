#!/usr/bin/env node

const { Site } = require('calibre')

const listSites = async () => {
  // List the sites
  const sites = await Site.list()

  // Output the formatted JSON response
  console.log(JSON.stringify(sites, null, 2))
}

listSites()
