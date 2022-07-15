import { request } from './graphql.js'

const LIST_QUERY = `
  query{
    emulatedDevices {
      tag
      title
      screenWidth
      screenHeight
      type
      isDiscontinued
    }
  }
`

const list = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.emulatedDevices
}

export { list }
