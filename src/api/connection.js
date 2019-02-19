const { request } = require('./graphql')

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
  const response = await request({ query: LIST_QUERY })
  return response.__type.enumValues
}

module.exports = {
  list
}
