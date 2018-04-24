const gql = require('../utils/api-client')
const { handleError } = require('../utils/api-error')

const LIST_QUERY = `
  query{
    __type(name: "ConnectionTag") {
      enumValues {
        name
      }
    }
  }
`

const list = async () => {
  try {
    const response = await gql.request(LIST_QUERY)
    return response.__type.enumValues
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  list
}
