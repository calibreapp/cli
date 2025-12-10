#!/usr/bin/env node

import { TestProfile } from 'calibre'

const update = async () => {
  const profileParams = {
    site: 'calibre',
    uuid: 'a47e812c-853a-4167-969f-7dd143eb213d',
    name: 'Desktop Profile',
    javascript: true,
    device: 'Desktop',
    connection: 'Cable'
  }

  try {
    const profile = await TestProfile.update(profileParams)

    console.log('Updated', profile)
  } catch (e) {
    console.error(e)
  }
}

update()
