const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const CREATE_MUTATION = `
  mutation CreateSite($attributes: SiteInput!){
    createSite(attributes: $attributes) {
      name
      slug

      testProfiles {
        name
        uuid
      }

      pages {
        name
        uuid
      }
    }
  }
`

const LIST_QUERY = `
  query {
    organisation {
      sites {
        name
        slug
        createdAt
      }
    }
  }
`

const create = async ({ name, location, pages, testProfiles }) => {
  try {
    const response = await gql.request(CREATE_MUTATION, {
      attributes: {
        name,
        location,
        pages,
        testProfiles
      }
    })

    return response.createSite
  } catch (e) {
    return handleError(e)
  }
}

const list = async () => {
  try {
    const response = await gql.request(LIST_QUERY)
    return response.organisation.sites
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  list
}
