const cruxOptions = {
  formFactor: {
    describe: 'Filter by device type.',
    choices: ['desktop', 'phone', 'tablet'],
    type: 'string'
  },
  timePeriod: {
    describe: 'History time window.',
    choices: [
      'three-months',
      'six-months',
      'nine-months',
      'twelve-months',
      'eighteen-months',
      'twenty-four-months'
    ],
    default: 'six-months',
    type: 'string'
  }
}

export { cruxOptions }
