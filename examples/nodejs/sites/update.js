#!/usr/bin/env node

const { Site } = require('calibre')

const updateSiteSettings = async () => {
  const slug = 'calibre'
  const name = 'Calibre Marketing Site'

  // Rename the site
  const siteSettings = await Site.update({
    slug,
    name
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(siteSettings, null, 2))
}

updateSiteSettings()
