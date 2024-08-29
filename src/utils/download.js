import https from 'https'
import zlib from 'zlib'
import fs from 'fs'

const download = (url, destination) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  if (fs.existsSync(destination)) return Promise.resolve()

  return new Promise(resolve => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const file = fs.createWriteStream(destination)
    https.get(url, response => {
      if (response.headers['content-encoding'] == 'gzip') {
        response.pipe(zlib.createGunzip()).pipe(file)
      } else if (response.headers['content-encoding'] == 'br') {
        response.pipe(zlib.createBrotliDecompress()).pipe(file)
      } else {
        response.pipe(file)
      }

      file.on('finish', () => file.close(resolve))
    })
  })
}

export default download
