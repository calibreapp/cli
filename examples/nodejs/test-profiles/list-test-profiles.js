#!/usr/bin/env node

import { TestProfile } from 'calibre'

const list = async () => {
  try {
    const profiles = await TestProfile.list({
      site: 'calibre'
    })

    console.log(profiles)
  } catch (e) {
    console.error(e)
  }
}

list()
