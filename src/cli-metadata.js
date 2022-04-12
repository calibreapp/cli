import Commands from './cli-commands.js'

const getCommandMetaData = (commands = Commands) => {
  return commands.map(cmd => {
    const { command, describe, commands, builder } = cmd
    const subcommands =
      commands?.map(c => {
        return getCommandMetaData([c])
      }) || []

    const options = typeof builder === 'function' ? {} : builder

    return {
      command,
      describe,
      options,
      subcommands
    }
  })
}

export { getCommandMetaData }
