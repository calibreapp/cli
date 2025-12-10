import { request } from './graphql.js'

const CREATE_MUTATION = `
  mutation CreateSinglePageTest($url: URL!, $location: LocationTag!, $device: DeviceTag, $connection: ConnectionTag, $cookies: [CookieInput!], $headers: [HeaderInput!], $isPrivate: Boolean, $webhookUrl: URL, $webhookSecret: String, $expiresAt: ISO8601DateTime, $blockedHosts: [String!]) {
    createTest(url: $url, location: $location, device: $device, connection: $connection, cookies: $cookies, headers: $headers, isPrivate: $isPrivate, webhookUrl: $webhookUrl, webhookSecret: $webhookSecret, expiresAt: $expiresAt, blockedHosts: $blockedHosts) {
      uuid
      formattedTestUrl
    }
  }
`

const LIST_QUERY = `
  query ListSinglePageTests {
    organisation {
      singlePageTests {
        uuid
        url
        formattedTestUrl
        isPrivate

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
        isPrivate
        runtimeError: artifact(name: TEST_ARTIFACT_RUNTIME_ERROR)
        markdownReport

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
  cookies,
  headers,
  isPrivate,
  webhookUrl,
  webhookSecret,
  blockedHosts,
  // Expire in 1 year
  expiresAt = new Date(Date.now() + 31556952000).toISOString()
}) => {
  const response = await request({
    query: CREATE_MUTATION,
    url,
    location,
    device,
    connection,
    cookies,
    headers,
    isPrivate,
    webhookUrl,
    webhookSecret,
    expiresAt,
    blockedHosts
  })
  return response.createTest
}

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitForTest = async uuid => {
  while (true) {
    await delay(5000)
    const run = await getTestByUuid(uuid)
    if (['completed', 'errored', 'timeout'].includes(run.status)) return run
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

export { create, getList, getTestByUuid, waitForTest, fetchArtifacts }
