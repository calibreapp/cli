#!/usr/bin/env node

const { Page } = require('calibre')

const main = async () => {
  try {
    const pages = await Page.list({ site: 'calibre', count: 25 })
    console.log(pages)
  } catch (e) {
    console.error(e)
  }
}

main()
