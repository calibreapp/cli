const execa = require('execa')

test('calibre --help', async () => {
  const { stdout } = await execa('calibre', ['--help'])
  expect(stdout).toMatchSnapshot()
})

test('calibre --version', async () => {
  const { stdout } = await execa('calibre', ['--version'])
  expect(stdout).toMatchSnapshot()
})
