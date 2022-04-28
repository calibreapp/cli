const handleError = err => {
  if (err.response && err.response.error) throw err.response
  if (err.response && err.response.errors) throw err.response.errors
  else throw err
}

const humaniseError = apiError => {
  if (
    apiError[0] &&
    apiError[0].extensions &&
    apiError[0].extensions.problems &&
    apiError[0].extensions.problems[0].explanation
  ) {
    return apiError[0].extensions.problems[0].explanation
  } else if (apiError[0] && apiError[0].message) {
    return apiError[0].message
  } else if (apiError.message) {
    return apiError.message
  } else {
    return `An unknown error occurred ${JSON.stringify(apiError, null, 2)}`
  }
}

export {
  handleError,
  humaniseError
}
