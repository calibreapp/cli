const fetch = require('node-fetch')

const clientInfo = require('../utils/client-info')
const headers = require('../utils/http-headers')

const create = ({ site, ref }) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/snapshot/${site}`, {
      headers,
      method: 'POST',
      body: JSON.stringify({
        ref
      })
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) return reject(json)

        resolve(json)
      })
      .catch(reject)
  })
}

const list = ({ site }) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/snapshots/${site}`, { headers })
      .then(res => res.json())
      .then(json => {
        if (json.error) return reject(json)

        resolve(json)
      })
      .catch(reject)
  })
}

module.exports = {
  create,
  list
}
