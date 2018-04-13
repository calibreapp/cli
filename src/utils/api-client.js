process.env.CALIBRE_HOST = process.env.CALIBRE_HOST || 'https://calibreapp.com'

const { GraphQLClient } = require('graphql-request')
const headers = require('./http-headers')

const endpoint = `${process.env.CALIBRE_HOST}/graphql`
const client = new GraphQLClient(endpoint, { headers })

module.exports = client
