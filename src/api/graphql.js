import { GraphQLClient } from 'graphql-request'
import { handleError } from '../utils/api-error.js'

import { getClientInfo } from '../utils/client-info.js'
import retrieveToken from '../utils/token.js'

const request = async ({ query, ...variables }) => {
  const { name, version } = await getClientInfo()

  const host = process.env.CALIBRE_HOST || 'https://api.calibreapp.com'
  const endpoint = `${host}/graphql`
  const token = retrieveToken()
  const headers = {
    Accept: 'application/json',
    'X-Client-Name': name,
    'X-Client-Version': version,
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

export { request }
