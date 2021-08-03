const main = async () => {
  throw new Error(
    'get-pulse-metrics has been deprecated. Please use `calibre site metrics` instead.'
  )
}

module.exports = {
  command: 'get-pulse-metrics [options]',
  describe: 'Deprecated in favour of the `metrics` command.',
  deprecated: true,
  handler: main
}
