import { readPackage } from 'read-pkg'

// In CLI mode we can use --experimental-json-modules
// but we can’t guarantee node environments will have that flag.
// Use `read-pkg` instead.

const getClientInfo = async () => {
  // Find nearest package.json
  const pkg = await readPackage()

  const name = 'calibre-node'
  const version = pkg.version

  return { name, version }
}

export { getClientInfo }
