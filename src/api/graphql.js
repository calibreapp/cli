const { GraphQLClient } = require('graphql-request')
const { handleError } = require('../utils/api-error')

const clientInfo = require('../utils/client-info')
const retrieveToken = require('../utils/token')

const request = async ({ query, ...variables }) => {
  const host = process.env.CALIBRE_HOST || 'https://calibreapp.com'
  const endpoint = `${host}/graphql`
  const token = retrieveToken()
  const headers = {
    Accept: 'application/json',
    'X-Client-Name': clientInfo.name,
    'X-Client-Version': clientInfo.version,
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  }
  const client = new GraphQLClient(endpoint, { headers })

  try {
    return await client.request(query, variables)
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  request
}
