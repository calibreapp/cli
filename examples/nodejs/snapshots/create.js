#!/usr/bin/env node

const { Snapshot } = require('calibre')

const createSnapshot = async () => {
  // Required
  const site = 'calibre'

  // Optional
  const ref = 'v100'

  // Create the snapshot
  const snapshot = await Snapshot.create({
    site,
    ref
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(snapshot, null, 2))
}

createSnapshot()
