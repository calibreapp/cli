#!/usr/bin/env node

const { TestProfile } = require('calibre')

const destroyProfile = async () => {
  const profileParams = {
    site: 'calibre',
    uuid: '3803a1ba-a9ec-417f-9673-5571d31325a8'
  }

  try {
    const profile = await TestProfile.destroy(profileParams)

    console.log('Deleted', profile)
  } catch (e) {
    console.error(e)
  }
}

destroyProfile()
