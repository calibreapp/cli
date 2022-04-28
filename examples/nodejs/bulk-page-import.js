#!/usr/bin/env node

import { Page } from 'calibre'

// This example imports from an array pages to a preexisting site called `calibre`
const siteSlug = 'calibre'

const pages = [
  { name: 'home', url: 'https://calibreapp.com' },
  { name: 'about', url: 'https://calibreapp.com/about' },
  { name: 'pricing', url: 'https://calibreapp.com/pricing' },
  { name: 'contact', url: 'https://calibreapp.com/contact' }
]

const create = async () => {
  console.log('---> Adding pages to', siteSlug)

  try {
    for await (const page of pages) {
      const { name, url } = page

      await Page.create({ site: siteSlug, name, url })

      console.log('\tAdded page:', page.name)
    }
  } catch (e) {
    console.error(e)
  }
}

create()
