#!/usr/bin/env node

import { TestProfile } from 'calibre'

const create = async () => {
  const profileParams = {
    site: 'calibre',
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
    ],
    headers: [
      {
        name: 'Authorization',
        value: 'Bearer 1234567890'
      }
    ]
  }

  try {
    const profile = await TestProfile.create(profileParams)

    console.log('Created', profile)
  } catch (e) {
    console.error(e)
  }
}

create()
