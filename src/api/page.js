const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

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
  try {
    const response = await gql.request(CREATE_MUTATION, {
      site,
      attributes: {
        name,
        url
      }
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

const destroy = async ({ site, uuid }) => {
  try {
    const response = await gql.request(DELETE_MUTATION, { site, uuid })
    return response.deletePage
  } catch (e) {
    return handleError(e)
  }
}

const update = async ({ site, uuid, name, url }) => {
  try {
    const response = await gql.request(UPDATE_MUTATION, {
      site,
      uuid,
      attributes: {
        name,
        url
      }
    })

    return response.updatePage
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  list,
  destroy,
  update
}
