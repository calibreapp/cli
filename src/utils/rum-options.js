const rumFilterOptions = {
  duration: {
    describe: 'Number of days to aggregate.',
    default: 7,
    type: 'number'
  },
  dateBin: {
    describe: 'Time granularity.',
    choices: ['today', 'day', 'month'],
    default: 'day',
    type: 'string'
  },
  country: {
    describe: 'Filter by country code (e.g. AU).',
    type: 'string'
  },
  device: {
    describe: 'Filter by device type.',
    choices: ['desktop', 'mobile', 'tablet'],
    type: 'string'
  },
  path: {
    describe: 'Filter by URL path.',
    type: 'string'
  },
  pageGrouping: {
    describe: 'Filter by page grouping UUID.',
    type: 'string'
  }
}

export { rumFilterOptions }
