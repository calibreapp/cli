const { request } = require('./graphql')

const LIST_QUERY = `
  query {
    locations {
      name
      shortName
      emoji
      tag

      agents {
        ipv4
      }
    }
  }
`

const list = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.locations
}

module.exports = {
  list
}
