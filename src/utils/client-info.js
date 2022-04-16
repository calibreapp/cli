import fs from 'node:fs'

const getClientInfo = async () => {
  const pkg = JSON.parse(
    fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf8')
  )

  const name = 'calibre-node'
  const version = pkg.version

  return { name, version }
}

export { getClientInfo }
