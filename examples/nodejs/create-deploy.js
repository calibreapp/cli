#!/usr/bin/env node

const { Deploy } = require('calibre')

const createDeploy = async () => {
  // Required
  const site = 'calibre'

  // Optional
  const revision = 'v100'
  const repository = 'https://github.com/calibreapp'
  const username = 'micdijkstra'
  const createdAt = '2019-04-25T04:11:00+10:00'

  // Create the deploy
  const deploy = await Deploy.create({
    site,
    revision,
    repository,
    username,
    createdAt
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(deploy, null, 2))
}

createDeploy()
