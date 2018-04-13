const gql = require('../utils/api-client')

const CREATE_MUTATION = `
  mutation CreateSinglePageTest($url: URL!, $location: LocationTag!, $device: DeviceTag, $connection: ConnectionTag) {
    createTest(url: $url, location: $location, device: $device, connection: $connection) {
      uuid
    }
  }
`

const LIST_QUERY = `
  query ListSinglePageTests {
    organisation {
      singlePageTests{
        uuid
        url
        formattedTestUrl

        device {
          title
        }

        connection {
          title
        }

        location {
          emoji
          shortName
        }

        status
        updatedAt
      }
    }
  }
`

const GET_BY_UUID = `
  query GetSinglePageTest($uuid: String!) {
    organisation{
      singlePageTest(uuid: $uuid) {
        uuid
        url
        formattedTestUrl
        status
        updatedAt

        metrics: measurements {
          name
          label
          value
        }

        device {
          title
        }

        connection {
          title
        }

        location {
          name
          emoji
        }
      }
    }
  }
`

const create = async ({ url, location, device, connection }) => {
  try {
    const response = await gql.request(CREATE_MUTATION, {
      url,
      location,
      device,
      connection
    })

    return response.createTest
  } catch (e) {
    if (e.response && e.response.error) throw e.response
    if (e.response && e.response.errors) throw e.response.errors
    else throw e
  }
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitForTest = async uuid => {
  while (true) {
    await delay(5000)
    const run = await getTestByUuid(uuid)
    if (run.status === 'completed') return run
    if (run.status === 'timeout' || run.status === 'errored') throw Error(run)
  }
}

const getList = async () => {
  try {
    const response = await gql.request(LIST_QUERY)
    return response.organisation.singlePageTests
  } catch (e) {
    if (e.response && e.response.error) throw e.response
    if (e.response && e.response.errors) throw e.response.errors
    else throw e
  }
}

const getTestByUuid = async uuid => {
  try {
    const response = await gql.request(GET_BY_UUID, {
      uuid
    })
    return response.organisation.singlePageTest
  } catch (e) {
    if (e.response && e.response.error) throw e.response
    if (e.response && e.response.errors) throw e.response.errors
    else throw e
  }
}

module.exports = {
  create,
  getList,
  getTestByUuid,
  waitForTest
}
