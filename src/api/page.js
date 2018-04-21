const gql = require('../utils/api-client')
const handleError = require('../utils/api-error')

const CREATE_MUTATION = `
  mutation CreatePage($site:String!, $name: String!, $url: URL!){
    createPage(site: $site, name: $name, url: $url) {
      uuid
      name
      url
    }
  }
`

const LIST_QUERY = `
  query ListPages(
    $site: String!
  ) {
    organisation {
      site(slug: $site) {
        pages {
          uuid
          name
          url
          canonical
        }
      }
    }
  }
`

const create = async ({ site, name, url }) => {
  try {
    const response = await gql.request(CREATE_MUTATION, {
      site,
      name,
      url
    })

    return response.createPage
  } catch (e) {
    return handleError(e)
  }
}

const list = async ({ site }) => {
  try {
    const response = await gql.request(LIST_QUERY, { site })
    return response.organisation.site.pages
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  list
}
