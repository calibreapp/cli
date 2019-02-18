const { request } = require('./graphql')

const CREATE_MUTATION = `
  mutation CreateSinglePageTest($url: URL!, $location: LocationTag!, $device: DeviceTag, $connection: ConnectionTag, $cookies: [CookieInput!]) {
    createTest(url: $url, location: $location, device: $device, connection: $connection, cookies: $cookies) {
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

const GET_TEST_ARTIFACT_URLS = `
  query GetSinglePageTestArtifacts($uuid: String!) {
    organisation {
      singlePageTest(uuid: $uuid) {
        uuid

        har: artifactURL(name: TEST_ARTIFACT_HAR)
      	lighthouse: artifactURL(name: TEST_ARTIFACT_LIGHTHOUSE)
      	image: mediaURL(name: TEST_MEDIA_IMAGE)
      	gif: mediaURL(name:TEST_MEDIA_GIF)
      	video: mediaURL(name: TEST_MEDIA_VIDEO)
      }
    }
  }
`

const create = async ({ url, location, device, connection, cookies }) => {
  const response = await request({
    query: CREATE_MUTATION,
    url,
    location,
    device,
    connection,
    cookies
  })
  return response.createTest
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitForTest = async uuid => {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await delay(5000)
    const run = await getTestByUuid(uuid)
    if (run.status === 'completed') return run
    if (run.status === 'timeout' || run.status === 'errored') throw Error(run)
  }
}

const getList = async () => {
  const response = await request({ query: LIST_QUERY })
  return response.organisation.singlePageTests
}

const getTestByUuid = async uuid => {
  const response = await request({ query: GET_BY_UUID, uuid })
  return response.organisation.singlePageTest
}

const fetchArtifacts = async uuid => {
  const response = await request({ query: GET_TEST_ARTIFACT_URLS, uuid })
  return response.organisation.singlePageTest
}

module.exports = {
  create,
  getList,
  getTestByUuid,
  waitForTest,
  fetchArtifacts
}
