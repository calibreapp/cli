const { request } = require('./graphql')

const CREATE_MUTATION = `
  mutation CreatePage($site: String!, $attributes: PageInput!){
    createPage(site: $site, attributes: $attributes) {
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

const DELETE_MUTATION = `
  mutation DeletePage($site:String!, $uuid: String!){
    deletePage(site: $site, uuid: $uuid) {
      name
      uuid
    }
  }
`

const UPDATE_MUTATION = `
  mutation UpdatePage($site:String!, $uuid: String!, $attributes: PageInput!){
    updatePage(site: $site, uuid: $uuid, attributes: $attributes) {
      uuid
      name
      url
    }
  }
`

const create = async ({ site, name, url }) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      name,
      url
    }
  })

  return response.createPage
}

const list = async ({ site }) => {
  const response = await request({ query: LIST_QUERY, site })
  return response.organisation.site.pages
}

const destroy = async ({ site, uuid }) => {
  const response = await request({ query: DELETE_MUTATION, site, uuid })
  return response.deletePage
}

const update = async ({ site, uuid, name, url }) => {
  const response = await request({
    query: UPDATE_MUTATION,
    site,
    uuid,
    attributes: {
      name,
      url
    }
  })

  return response.updatePage
}

module.exports = {
  create,
  list,
  destroy,
  update
}
