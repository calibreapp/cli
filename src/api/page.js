const gql = require('../utils/api-client')
const handleError = require('../utils/api-error')

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
    return handleError(e)
  }
}

module.exports = {
  list
}
