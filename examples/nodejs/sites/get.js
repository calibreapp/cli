#!/usr/bin/env node

const { Site } = require('calibre')

const getSite = async () => {
  const slug = 'calibre' // site slug

  // Get the site
  const site = await Site.get({
    slug
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(site, null, 2))
}

getSite()
