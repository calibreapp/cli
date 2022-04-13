#!/usr/bin/env node

/*
  calibre v5.0.0+ required

  This example will fetch time series data for a given site for the past 7 days
  and group the data by test profile.
*/

import { TimeSeries } from 'calibre'

const main = async () => {
  const site = 'calibre'
  const to = new Date()
  const from = new Date()
  const metrics = [
    'lighthouse-performance-score',
    'first-contentful-paint',
    'consistently-interactive'
  ]
  from.setDate(to.getDate() - 7)

  const timeSeries = await TimeSeries.list({
    site,
    from: from.toUTCString(),
    to: to.toUTCString(),
    measurements: metrics
  })

  const { pages, testProfiles, times, series, measurements } = timeSeries

  const page = pages[0]
  console.log(`Time series data for ${page.name} (${page.url})`)

  testProfiles.forEach(testProfile => {
    console.log('')
    console.log(`${testProfile.name}`)

    series
      .filter(series => series.profile === testProfile.uuid)
      .forEach(series => {
        const measurement = measurements.find(
          measurement => measurement.name === series.measurement
        )
        console.log(`  ${measurement.label}`)
        times.forEach((time, index) => {
          const value = series.values[index]
          console.log(`    ${time.timestamp} - ${time.name} - ${value}`)
        })
      })
  })
}

main()
