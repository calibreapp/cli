const handleError = err => {
  if (err.response && err.response.error) throw err.response
  if (err.response && err.response.errors) throw err.response.errors
  else throw err
}

const humaniseError = apiError => {
  if (apiError[0].problems && apiError[0].problems[0].explanation) {
    return apiError[0].problems[0].explanation
  } else if (apiError[0].message) {
    return apiError[0].message
  } else {
    return `An unknown error occurred ${apiError}`
  }
}

module.exports = {
  handleError,
  humaniseError
}
