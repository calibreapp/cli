const gql = require('../utils/api-client')

const LIST_QUERY = `
  query ListPages(
    $site: String!
  ) {
    organisation {
      site(slug: $site) {
        pages {
          name
          url
          slug
          canonical
        }
      }
    }
  }
`

const list = async ({ site }) => {
  try {
    const response = await gql.request(LIST_QUERY, { site })
    return response.organisation.site.pages
  } catch (e) {
    throw e.response.errors
  }
}

module.exports = {
  list
}
