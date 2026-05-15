import { styleText } from 'node:util'

const toGradeScore = score => {
  if (score >= 90) return styleText(['bold', 'green'], score)
  if (score > 50 && score < 90) return styleText(['bold', 'yellow'], score)
  if (score <= 50) return styleText(['bold', 'red'], score)
  return 'N/A'
}

export default toGradeScore
