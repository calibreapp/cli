#!/usr/bin/env node

const { Integration } = require('calibre')

const listIntegrations = async () => {
  const site = 'calibre' // site slug
  const count = 20 // number of integrations to return, maximum 500

  // List the integrations
  const integrations = await Integration.list({
    site,
    count
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(integrations, null, 2))
}

listIntegrations()
