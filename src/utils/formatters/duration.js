const toDuration = value => {
  if (!value) return '-'

  let unit = 'ms'
  let ms = parseInt(value)

  if (ms > 1000) {
    ms = (ms / 1000).toFixed(2)
    unit = 'sec'
  }

  return `${ms} ${unit}`
}

export default toDuration
