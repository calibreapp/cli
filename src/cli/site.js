exports.command = 'site <command>'
exports.desc = 'Tasks related to sites'
exports.builder = function(yargs) {
  return yargs.commandDir('site')
}
exports.handler = function(argv) {}
