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
    if (e.response && e.response.error) throw e.response
    if (e.response && e.response.errors) throw e.response.errors
    else throw e
  }
}

module.exports = {
  list
}
