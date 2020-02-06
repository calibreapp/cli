exports.command = 'token <command>'
exports.desc = 'Tasks related to tokens'
exports.builder = yargs => {
  return yargs.commandDir('token')
}
exports.handler = () => {}
