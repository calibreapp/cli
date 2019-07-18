#!/usr/bin/env node

const { Snapshot } = require('calibre')

const deleteSnapshots = async () => {
  // Required
  const site = 'calibre' // site-slug
  const id = 60 // id of the snapshot

  // Delete the snapshot
  const snapshot = await Snapshot.destroy({
    site,
    id
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(snapshot, null, 2))
}

deleteSnapshots()
