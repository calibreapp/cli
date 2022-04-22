import { GraphQLClient } from 'graphql-request'
import pThrottle from 'p-throttle'

import { handleError } from '../utils/api-error.js'

import retrieveToken from '../utils/token.js'

const throttle = pThrottle({
  limit: 10,
  interval: 1100,
  strict: true
})

const request = async ({ query, ...variables }) => {
  const host = process.env.CALIBRE_HOST || 'https://api.calibreapp.com'
  const endpoint = `${host}/graphql`
  const token = retrieveToken()
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Token ${token}`
  }

  const throttledRequest = throttle(async () => {
    const client = new GraphQLClient(endpoint, { headers })
    const response = await client.request(query, variables)

    return response
  })

  try {
    return await throttledRequest()
  } catch (e) {
    return handleError(e)
  }
}

export { request }
