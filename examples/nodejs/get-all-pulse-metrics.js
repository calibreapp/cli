#!/usr/bin/env node

/*
  calibre v1.2.3+ required
  
  This example will fetch all sites from a given account,
  then, the 7 days worth of consistently-interactive for each site
*/

const { Site, SnapshotMetrics } = require('calibre')

const main = async () => {
  const sites = await Site.list()

  console.log(`=== ${sites.length} sites`)

  const metrics = await Promise.all(
    sites.map(({ slug }) => {
      return SnapshotMetrics.pulse({
        site: slug,
        durationInDays: 7,
        metrics: ['consistently-interactive']
      })
    })
  )

  console.log('=== Logging formatted JSON metrics ===')

  console.log(JSON.stringify(metrics, null, 2))
}

main()
