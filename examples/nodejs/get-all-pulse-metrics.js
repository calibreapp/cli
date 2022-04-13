#!/usr/bin/env node

/*
  calibre v5.0.0+ required

  This example will fetch all sites from a given account,
  then, the 7 days worth of consistently-interactive for each site
*/

import { Site, TimeSeries } from 'calibre'

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
        from: from.toUTCString(),
        to: to.toUTCString(),
        measurements: ['consistently-interactive']
      })
    })
  )

  console.log('=== Logging formatted JSON metrics ===')

  console.log(
    JSON.stringify(
      metrics.map(({ times, series }) => ({
        times,
        series
      })),
      null,
      2
    )
  )
}

main()
