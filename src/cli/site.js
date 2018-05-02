exports.command = 'site <command>'
exports.desc = 'Tasks related to sites'
exports.builder = yargs => {
  return yargs.commandDir('site')
}
exports.handler = argv => {}
