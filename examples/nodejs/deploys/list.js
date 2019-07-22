#!/usr/bin/env node

const { Deploy } = require('calibre')

const listDeploy = async () => {
  // Required
  const site = 'calibre'

  // List the deploys
  const deploys = await Deploy.list({
    site
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(deploy, null, 2))
}

createDeploy()
