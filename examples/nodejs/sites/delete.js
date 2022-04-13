#!/usr/bin/env node

import { Site } from 'calibre'

const deleteSite = async () => {
  // Required
  const slug = 'calibre' // site-slug

  // Delete the site
  const site = await Site.destroy({
    slug
  })

  // Output the formatted JSON response
  console.log(JSON.stringify(site, null, 2))
}

deleteSite()
