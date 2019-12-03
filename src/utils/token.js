const Configstore = require('configstore')
const pkg = require('../../package.json')
const config = new Configstore(pkg.name)

const retrieveToken = () => {
  const token = process.env.CALIBRE_API_TOKEN || config.get('token')
  if (!token) {
    throw new Error(
      'Please set CALIBRE_API_TOKEN as an environment variable. See calibreapp.com/docs/api/tokens for help.'
    )
  }

  return token
}

module.exports = retrieveToken
