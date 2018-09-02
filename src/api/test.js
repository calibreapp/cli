const gql = require('../utils/api-client')
const {
  handleError
} = require('../utils/api-error')

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

const create = async ({
  url,
  location,
  device,
  connection,
  cookies
}) => {
  try {
    const response = await gql.request(CREATE_MUTATION, {
      url,
      location,
      device,
      connection,
      cookies
    })

    return response.createTest
  } catch (e) {
    return handleError(e)
  }
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
  try {
    const response = await gql.request(LIST_QUERY)
    return response.organisation.singlePageTests
  } catch (e) {
    return handleError(e)
  }
}

const getTestByUuid = async uuid => {
  try {
    const response = await gql.request(GET_BY_UUID, {
      uuid
    })
    return response.organisation.singlePageTest
  } catch (e) {
    return handleError(e)
  }
}

const fetchArtifacts = async uuid => {
  try {
    const response = await gql.request(GET_TEST_ARTIFACT_URLS, {
      uuid
    })
    return response.organisation.singlePageTest
  } catch (e) {
    return handleError(e)
  }
}

module.exports = {
  create,
  getList,
  getTestByUuid,
  waitForTest,
  fetchArtifacts
}
