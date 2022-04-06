import chalk from 'chalk'
import { format } from '../utils/formatters'

const barSection = '■'
const chartWidth = 80

const bar = (value, maxValue) => {
  const barLength = (value * chartWidth) / maxValue
  const wholeNumberPart = Math.floor(barLength)
  const emptyPart = chartWidth - wholeNumberPart
  let bar = chalk.blue(barSection).repeat(wholeNumberPart)
  let empty = chalk.grey(barSection).repeat(emptyPart)

  return bar + empty
}

const chart = (data, formatter) => {
  const maxValue = Math.max(...data.map(item => parseInt(item.value || 0)))
  return data
    .map(item => {
      const barText = bar(item.value || 0, maxValue)
      return `${item.key}\n${barText} ${format({
        formatter,
        value: item.value
      })}`
    })
    .join('\n\n')
}

export default chart
