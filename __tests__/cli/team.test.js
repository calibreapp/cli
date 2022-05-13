import { runCLI } from '../utils'

test('missing subcommand', async () => {
  const out = await runCLI({ args: 'team', testForError: true })
  expect(out).toMatchSnapshot()
})
