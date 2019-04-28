#!/usr/bin/env node

/*
  calibre v2.0.0+ required
  
  This example will fetch all sites from a given account,
  then, the 7 days worth of consistently-interactive for each site
*/

const { Site, TimeSeries } = require('calibre')

const main = async () => {
  const sites = await Site.list()

  const to = new Date()

  const from = new Date()
  from.setDate(to.getDate() - 7)

  console.log(`=== ${sites.length} sites`)

  const metrics = await Promise.all(
    sites.map(({ slug }) => {
      return TimeSeries.list({
        site: slug,
        from,
        to,
        metrics: ['consistently-interactive']
      })
    })
  )

  console.log('=== Logging formatted JSON metrics ===')

  console.log(JSON.stringify(metrics, null, 2))
}

main()
