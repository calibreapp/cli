const convert = value => {
  if (value === null || value === undefined) return '-'
  return `${value ? value / 1000 : 0}`
}

export default convert
