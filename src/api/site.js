const { request } = require('./graphql')

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

const DELETE_MUTATION = `
  mutation DeleteSite($slug:String!){
    deleteSite(site: $slug) {
      name
      slug
    }
  }
`

const create = async ({ name, location, pages, testProfiles }) => {
  const response = await request({
    query: CREATE_MUTATION,
    attributes: {
      name,
      location,
      pages,
      testProfiles
    }
  })

  return response.createSite
}

const list = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.organisation.sites
}

const destroy = async ({ slug }) => {
  const response = await request({ query: DELETE_MUTATION, slug })
  return response.deleteSite
}

module.exports = {
  create,
  list,
  destroy
}
