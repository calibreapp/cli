#!/usr/bin/env node

const { Site } = require('calibre')

const updateSiteSettings = async () => {
  const slug = 'calibre'
  const authenticationSettings = {
    required: true, // Set to false to disable authentication
    url: 'https://calibreapp.com',
    username: 'user',
    password: 'password',
    formSelector: '#form',
    usernameSelector: '#username',
    passwordSelector: '#password'
  }

  // Update the site settings
  const siteSettings = await Site.update({
    slug,
    authenticationSettings
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(siteSettings, null, 2))
}

updateSiteSettings()
