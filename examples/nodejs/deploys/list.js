#!/usr/bin/env node

const { Deploy } = require('calibre')

const listDeploys = async () => {
  // Required
  const site = 'calibre'

  // List the deploys
  const deploys = await Deploy.list({
    site
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(deploys, null, 2))
}

listDeploys()
