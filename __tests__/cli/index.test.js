import { execa } from 'execa'

test('calibre --help', async () => {
  const { stdout } = await execa('calibre', ['--help'])
  expect(stdout).toMatchSnapshot()
})
