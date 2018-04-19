const gql = require('../utils/api-client')
const handleError = require('../utils/api-error')

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
    return handleError(e)
  }
}

module.exports = {
  list
}
