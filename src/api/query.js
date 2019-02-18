const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const query = async ( {query, ...variables} ) => {
  try {
    return await gql.request(query, variables)
  } catch (e) {
    return handleError(e)
  }
}

module.exports = query
