const options = {
  site: {
    demandOption: true,
    describe: 'The identifying slug of a site',
    type: 'string',
    requiresArg: true
  },
  json: { describe: 'Return the output in JSON format' },
  csv: { describe: 'Return the output in CSV format' },
  from: {
    describe:
      'The start date to retrieve from in the format Year-Month-Day (when not set, defaults to 7 days ago)'
  },
  to: {
    describe:
      'The end date to retrieve to in the format Year-Month-Day (when not set, defaults to today)'
  }
}

module.exports.options = options
