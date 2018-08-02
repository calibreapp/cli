#!/usr/bin/env node


/*
  This example will fetch all sites from a given account,
  then it will fetch the pulse metrics from each page.

  calibre v1.1.0 required for this example.
*/

const {
  Site,
  Page,
  SnapshotMetrics
} = require('calibre')

const main = async () => {
  let allPulseMetrics = {}
  const sites = await Site.list()

  console.log(`=== ${sites.length} sites`)

  await Promise.all(sites.map(async site => {
    allPulseMetrics[site.slug] = {}

    const pages = await Page.list({
      site: site.slug
    })

    // Iterate through each page, returning a promise for the metrics being fetched
    return Promise.all(pages.map(async page => {
      const pulse = await SnapshotMetrics.pulse({
        site: site.slug,
        page: page.uuid,
        durationInDays: 7,
        metrics: ['consistently-interactive']
      })

      // Update the allPulseMetrics hash with metrics for this page
      allPulseMetrics[site.slug][page.uuid] = {
        page: page,
        pulse: pulse
      }

      return pulse
    }))
  }))


  console.log('=== Logging formatted JSON metrics ===')

  console.log(JSON.stringify(allPulseMetrics, null, 2))
}

main()
