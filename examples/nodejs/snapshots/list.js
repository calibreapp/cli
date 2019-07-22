#!/usr/bin/env node

const { Snapshot } = require('calibre')

const listSnapshots = async () => {
  // Required
  const site = 'calibre'
  const count = 25

  // List the snapshots
  const snapshots = await Snapshot.list({
    site,
    count
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(snapshots, null, 2))
}

listSnapshots()
