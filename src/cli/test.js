
const command = 'test <command>'
const desc = 'Single page tests'
const builder = yargs => {
  return yargs.commandDir('test')
}
const handler = () => { }

export {
  command, desc, builder, handler
}

