const fetch = require('node-fetch')

const clientInfo = require('../utils/client-info')
const headers = require('../utils/http-headers')

const list = () => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.CALIBRE_HOST}/api/cli/sites`, { headers })
      .then(res => res.json())
      .then(json => {
        if (json.error) return reject(json)

        resolve(json)
      })
      .catch(reject)
  })
}

module.exports = {
  list
}
