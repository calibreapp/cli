#!/usr/bin/env node

const { Site } = require('calibre')

const create = async () => {
  const name = 'Calibre'
  const location = 'Frankfurt'
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
      name: 'iPhone 8, 3G',
      device: 'iPhone8',
      connection: 'good3G'
    }
  ]
  try {
    const site = await Site.create({ name, location, pages, testProfiles })

    console.log('Created', site)
  } catch (e) {
    console.error(e)
  }
}

create()
