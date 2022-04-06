import { request } from './graphql'

const CREATE_MUTATION = `
  mutation CreateIntegration($organisation: String, $site: String!, $attributes: IntegrationInput!){
    createIntegration(organisation: $organisation, site: $site, attributes: $attributes) {
      uuid
      destination
      events
      url
      secret
      isDisabled
    }
  }
`

const DELETE_MUTATION = `
  mutation DeleteIntegration($organisation: String, $site:String!, $uuid: String!){
    deleteIntegration(organisation: $organisation, site: $site, uuid: $uuid) {
      uuid
    }
  }
`

const UPDATE_MUTATION = `
  mutation UpdateIntegration($site:String!, $uuid: String!, $attributes: IntegrationInput!){
    updateIntegration(site: $site, uuid: $uuid, attributes: $attributes) {
      uuid
      destination
      events
      url
      secret
      isDisabled
    }
  }
`
const LIST_QUERY = `
  query ListIntegrations(
    $site: String!
    $count: Int!
    $cursor: String
  ) {
    organisation {
      site(slug: $site) {
        integrationsList(first: $count, after: $cursor) {
          pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
            startCursor
          }

          edges {
            node {
              uuid
              destination
              events
              url
              secret
              isDisabled
            }
          }
        }
      }
    }
  }
`

const create = async ({
  site,
  destination,
  url,
  events,
  secret,
  isDisabled
}) => {
  const response = await request({
    query: CREATE_MUTATION,
    site,
    attributes: {
      destination,
      url,
      events,
      secret,
      isDisabled
    }
  })
  return response.createIntegration
}

const destroy = async ({ site, uuid }) => {
  const response = await request({
    query: DELETE_MUTATION,
    site,
    uuid
  })
  return response.deleteIntegration
}

const update = async ({
  site,
  uuid,
  destination,
  url,
  events,
  secret,
  isDisabled
}) => {
  const response = await request({
    query: UPDATE_MUTATION,
    site,
    uuid,
    attributes: {
      destination,
      url,
      events,
      secret,
      isDisabled
    }
  })

  return response.updateIntegration
}

const list = async ({ site, count, cursor }) => {
  const response = await request({
    query: LIST_QUERY,
    site,
    count,
    cursor
  })

  return {
    integrations: response.organisation.site.integrationsList.edges.map(
      edge => edge.node
    ),
    pageInfo: response.organisation.site.integrationsList.pageInfo
  }
}

export { create, destroy, update, list }
