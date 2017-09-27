const pkg = require('../../package.json')
const clientInfo = require('./client-info')

module.exports = {
  Accept: 'application/json',
  'X-Client-Name': clientInfo.name,
  'X-Client-Version': clientInfo.version,
  'Content-Type': 'application/json',
  Authorization: `Token ${process.env.CALIBRE_API_KEY}`
}
