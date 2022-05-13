import { request } from './graphql.js'

const LIST_QUERY = `
  query {
    organisation {
      teams {
        name
        description
        slug
      }
    }
  }
`

const list = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.organisation.teams
}

export { list }
