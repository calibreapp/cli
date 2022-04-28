#!/usr/bin/env node

import { Site } from 'calibre'

const slug = 'calibre'

// Get the site
const site = await Site.get({
  slug
})

// Output the formatted JSON response
console.log(JSON.stringify(site, null, 2))
