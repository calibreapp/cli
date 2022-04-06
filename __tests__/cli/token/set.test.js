import { runCLI } from '../../utils'

test('missing token argument', async () => {
  const out = await runCLI({ args: 'token', testForError: true })
  expect(out).toMatchSnapshot()
})

test('sets token', async () => {
  const out = await runCLI({ args: 'token set 123', testForError: true })
  expect(out).toMatchSnapshot()
})
