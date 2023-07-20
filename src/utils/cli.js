const options = {
  site: {
    demandOption: true,
    describe:
      'A unique slug identifying each Site. You can find it in Site Settings → General or by using the calibre site list command.',
    type: 'string',
    requiresArg: true
  },
  json: { describe: 'Outputs the results of the command in JSON format.' },
  markdown: {
    describe: 'Outputs the results of the command in Markdown format.'
  },
  csv: { describe: 'Outputs the results of the command in CSV format.' },
  from: {
    describe:
      'The start date to retrieve data from in the Year-Month-Day format (default: 7 days ago).'
  },
  to: {
    describe:
      'The end date to retrieve data from in the Year-Month-Day format (default: today).'
  },
  count: {
    default: 25,
    describe: 'The number of items to return (default: 25, maximum: 500).'
  },
  cursor: {
    describe: 'The cursor to fetch records after'
  },
  pages: {
    type: 'array',
    describe:
      'A list of Page UUIDs to return metrics for. You can separate multiple Pages by a space or use multiple --pages flags.'
  },
  profiles: {
    type: 'array',
    describe:
      'A list of Test Profile UUIDs to return metrics for. You can separate multiple Test Profiles by a space or use multiple --profiles flags.'
  },
  metrics: {
    type: 'array',
    describe:
      'A list of metric UUIDs to return metrics for. You can separate multiple metrics by a space or use multiple --metrics flags.'
  }
}

export { options }
