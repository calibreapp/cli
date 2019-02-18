#!/usr/bin/env node

const { GraphQL } = require('calibre')

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
    const result = await GraphQL.query({ query, slug })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}

site()
