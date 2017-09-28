const fetch = require('node-fetch')

const clientInfo = require('../utils/client-info')
const headers = require('../utils/http-headers')

const create = ({ url, location, device, connection }) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/run`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        url,
        location,
        device,
        connection,
        client_name: clientInfo.name,
        client_version: clientInfo.version
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          return reject(json)
        }

        resolve(json.uuid)
      })
      .catch(reject)
  })
}

const getList = () => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/runs`, { headers })
      .then(res => res.json())
      .then(res => {
        resolve(res)
      })
      .catch(reject)
  })
}

const getTestByUuid = uuid => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/run/${uuid}`, { headers })
      .then(res => resolve(res.json()))
      .catch(reject)
  })
}

const fetchReport = ({ name, url }) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(res => resolve({ name, url, report: res }))
      .catch(reject)
  })
}

const getTestResults = async ({ reports }) => {
  const promises = reports.map(report => fetchReport(report))
  return await Promise.all(promises)
}

module.exports = {
  create,
  getList,
  getTestByUuid,
  getTestResults
}
