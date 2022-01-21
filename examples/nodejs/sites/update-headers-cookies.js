#!/usr/bin/env node

const { Site } = require('calibre')

const updateSiteSettings = async () => {
  const slug = 'calibre'
  const cookies = [
    {
      name: 'analytics-opt-out',
      value: 'true',
      domain: 'calibreapp.com',
      path: '/',
      secure: true,
      httpOnly: false
    }
  ]
  const headers = [{ name: 'CALIBRE_AGENT', value: 'SET' }]

  // Update the site settings
  const siteSettings = await Site.update({
    slug,
    cookies,
    headers
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(siteSettings, null, 2))
}

updateSiteSettings()
