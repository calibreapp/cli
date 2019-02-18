#!/usr/bin/env node

const { GraphQL } = require('../../index.js')

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
  const slug = 'cal'

  try {
    const result = await GraphQL.request({ query, slug })
    console.log(result)
  } catch (e) {
    console.error(e)
  }
}

site()
