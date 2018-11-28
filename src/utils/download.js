const https = require('https')
const zlib = require('zlib')
const fs = require('fs')

const download = (url, destination) => {
  if (fs.existsSync(destination)) return Promise.resolve()

  return new Promise(resolve => {
    const file = fs.createWriteStream(destination)
    https.get(url, response => {
      if (response.headers['content-encoding'] == 'gzip') {
        response.pipe(zlib.createGunzip()).pipe(file)
      } else {
        response.pipe(file)
      }

      file.on('finish', () => file.close(resolve))
    })
  })
}

module.exports = download
