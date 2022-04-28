#!/usr/bin/env node

import { Page } from 'calibre'

const main = async () => {
  try {
    const pages = await Page.list({ site: 'calibre', count: 25 })
    console.log(pages)
  } catch (e) {
    console.error(e)
  }
}

main()
