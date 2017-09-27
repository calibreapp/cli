const fetch = require('node-fetch')

const clientInfo = require('../utils/client-info')
const headers = require('../utils/http-headers')

const getList = () => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/runs`, { headers })
      .then(res => resolve(res.json()))
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
  getList,
  getTestByUuid,
  getTestResults
}
