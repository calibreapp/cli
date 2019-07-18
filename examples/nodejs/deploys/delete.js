#!/usr/bin/env node

const { Deploy } = require('calibre')

const deleteDeploys = async () => {
  // Required
  const site = 'calibre' // site-slug
  const uuid = 'cddd1ae9-4af3-4f0e-b9d5-8e26b7848ae3' // uuid of the deploy

  // Delete the deploy
  const deploy = await Deploy.destroy({
    site,
    uuid
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(deploy, null, 2))
}

deleteDeploys()
