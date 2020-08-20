#!/usr/bin/env node

const { TestProfile } = require('calibre')

const update = async () => {
  const profileParams = {
    site: 'calibre',
    uuid: 'a47e812c-853a-4167-969f-7dd143eb213d',
    name: 'Adblocker on',
    adblocker: true
  }

  try {
    const profile = await TestProfile.update(profileParams)

    console.log('Updated', profile)
  } catch (e) {
    console.error(e)
  }
}

update()
