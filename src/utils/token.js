import Configstore from 'configstore'
import pkg from '../../package.json'
const config = new Configstore(pkg.name)

const retrieveToken = () => {
  const token = process.env.CALIBRE_API_TOKEN || config.get('token')
  if (!token) {
    throw new Error(
      'Please set your Calibre API token by running `calibre token set`\n or set the environment variable CALIBRE_API_TOKEN.\n\n See calibreapp.com/docs/api/tokens for help.'
    )
  }

  return token
}

export default retrieveToken
