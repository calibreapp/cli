const fs = require('fs')
const path = require('path')

// Returns a string of the created directory path
/*
 * @param {string[]} - The paths to create
 * @return {string} - The full path to the resulted directory
 */
const mkdirp = directories => {
  directories.reduce((reducePath, dir) => {
    reducePath = path.join(reducePath, dir)
    if (!fs.existsSync(reducePath)) {
      fs.mkdirSync(reducePath)
    }
    return reducePath
  }, '')

  return path.join(...directories)
}

module.exports = mkdirp
