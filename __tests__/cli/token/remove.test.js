import Configstore from 'configstore'

import { runCLI } from '../../utils'

import pkg from '../../../package.json'

const config = new Configstore(pkg.name)

describe('remove token', () => {
  test('is removed', async () => {
    config.set('token', '123')
    const out = await runCLI({ args: 'token remove', testForError: true })
    expect(out).toMatchSnapshot()
  })

  test('no token to remove', async () => {
    const out = await runCLI({ args: 'token remove', testForError: true })
    expect(out).toMatchSnapshot()
  })
})
