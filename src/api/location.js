const gql = require('../utils/api-client')

const LIST_QUERY = `
  query {
    locations {
      name
      emoji
      tag

      agents {
        ipv4
      }
    }
  }
`

const list = async () => {
  try {
    const response = await gql.request(LIST_QUERY)
    return response.locations
  } catch (e) {
    if (e.response.error) throw e.response
    else throw e.response.errors
  }
}

module.exports = {
  list
}
