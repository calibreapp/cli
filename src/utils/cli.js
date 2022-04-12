const options = {
  site: {
    demandOption: true,
    describe: 'The identifying slug of a site',
    type: 'string',
    requiresArg: true
  },
  json: { describe: 'Output in JSON format' },
  csv: { describe: 'Output in CSV format' },
  from: {
    describe:
      'The start date to retrieve from in the format Year-Month-Day (when not set, defaults to 7 days ago)'
  },
  to: {
    describe:
      'The end date to retrieve to in the format Year-Month-Day (when not set, defaults to today)'
  },
  count: {
    default: 25,
    describe: 'The number of records to return, maximum: 500'
  },
  cursor: {
    describe: 'The cursor to fetch records after'
  },
  pages: {
    type: 'array',
    describe:
      'A space separated list of page uuids to return metrics for (when not set, defaults to all pages). eg: --pages=4a82662c-67dc-40cd-a461-6afc904260f3 51b3cb71-e534-4d48-842a-d8c9da672f55 or use multiple --pages for each page'
  },
  profiles: {
    type: 'array',
    describe:
      'A space separated list of profile uuids to return metrics for (when not set, defaults to all test profiles). eg: --profiles=4a82662c-67dc-40cd-a461-6afc904260f3 51b3cb71-e534-4d48-842a-d8c9da672f55 or use multiple --profiles for each profile'
  },
  metrics: {
    type: 'array',
    describe:
      'A space separated list of metrics to return (when not set, defaults to all metrics). eg: --metrics=first-meaningful-paint first-interactive or use multiple --metrics flags for each metric'
  }
}

export { options }
