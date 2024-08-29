import { getCommandMetaData } from './src/cli-metadata.js'

const formatHeader = ({ command, describe }) => {
  return `
### calibre ${command}

${describe || ''}
`
}

const formatOptions = options => {
  const optionKeys = Object.keys(options)
  if (!optionKeys.length) {
    return ''
  } else {
    return `Flags:
 ${optionKeys.map(key => {
   // eslint-disable-next-line security/detect-object-injection
   const { describe, default: defaultValue, type } = options[key]
   return `
  * \`--${key}\`: ${describe}${
    defaultValue ? ` (default: \`${defaultValue}\`)` : ''
  }${type ? ` (${type})` : ''}`
 })}`
  }
}

const template = command => {
  let options = []

  // Print subcommands or options
  if (command.subcommands && !command.subcommands.length) {
    options.push(formatHeader(command))
    options.push(formatOptions(command.options))
  } else {
    for (const subcommand of command.subcommands) {
      const newCommand = command.command.replace(
        '<command>',
        subcommand.command
      )

      options.push(template({ ...subcommand, command: newCommand }))
    }
  }

  return [...options, null].join('\n')
}

const commands = getCommandMetaData()

let output = ''

commands.forEach(command => {
  output += template(command)
})

console.log(output)
