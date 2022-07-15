#!/usr/bin/env node

import { Site } from 'calibre'

const create = async () => {
  const name = 'Calibre API TEST'
  const teamName = 'calibre'

  const agentSettings = {
    location: 'Frankfurt', // location tag
    scheduleAnchor: 6,
    scheduleInterval: 'every_x_hours' // options: off, daily, hourly, every_x_hours. default: off
  }

  const pages = [
    {
      name: 'Home',
      url: 'https://calibreapp.com/',
      canonical: true
    },
    {
      name: 'CLI Landing',
      url: 'https://calibreapp.com/cli'
    },
    {
      name: 'Pricing',
      url: 'https://calibreapp.com/pricing'
    }
  ]

  const testProfiles = [
    {
      name: 'Chrome Desktop',
      device: 'Desktop',
      connection: 'cable',
      cookies: [
        {
          name: 'app.sid',
          value: 'sessionId',
          domain: 'calibreapp.com',
          path: '/',
          secure: true,
          httpOnly: true
        }
      ]
    },
    {
      name: 'iPhone 12, 3G',
      device: 'iPhone12',
      connection: 'LTE'
    }
  ]

  try {
    const site = await Site.create({
      name,
      team: teamName,
      agentSettings,
      pages,
      testProfiles
    })

    console.log('Created', site)
  } catch (e) {
    console.error(e)
  }
}

create()
