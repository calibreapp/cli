const options = {
  site: {
    demandOption: true,
    describe: 'The identifying slug of a site',
    type: 'string',
    requiresArg: true
  },
  json: { describe: 'Return the output in JSON format' },
  csv: { describe: 'Return the output in CSV format' }
}

module.exports.options = options
