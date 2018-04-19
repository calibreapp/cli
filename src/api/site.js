const gql = require('../utils/api-client')
const handleError = require('../utils/api-error')

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

const list = async () => {
  try {
    const response = await gql.request(LIST_QUERY)
    return response.organisation.sites
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  list
}
