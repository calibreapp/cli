module.exports = err => {
  if (err.response && err.response.error) throw err.response
  if (err.response && err.response.errors) throw err.response.errors
  else throw err
}
