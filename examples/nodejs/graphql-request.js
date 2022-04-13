#!/usr/bin/env node

import { GraphQL } from 'calibre'

const site = async () => {
  const query = `
    query Site($slug: String!){
      organisation {
        site(slug: $slug) {
          name
          slug
        }
      }
    }
  `
  const slug = 'calibre'

  try {
    const result = await GraphQL.request({ query, slug })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}

site()
