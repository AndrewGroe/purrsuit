const axios = require('./axios')

exports.handler = async function (event, context) {
  let userToken = null

  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.PETFINDER_CLIENT_ID,
    client_secret: process.env.PETFINDER_CLIENT_SECRET
  }

  /**
   * Checks if user has a token
   * if not, requests and returns one from petfinder API
   */
  async function auth () {
    if (userToken === null) {
      console.log('fetching token...')
      const newToken = await axios.post('https://api.petfinder.com/v2/oauth2/token', data)
      return newToken.data.access_token
    } return userToken
  }

  /**
   * fetches all pets from petfinder API
   */
  async function getPets (token) {
    console.log(token)
    const AuthStr = 'Bearer '.concat(token)
    const response = await axios.get('https://api.petfinder.com/v2/animals', { headers: { Authorization: AuthStr } })
    return response.data.animals
  }

  try {
    userToken = await auth()
    const pets = await getPets(userToken)

    return {
      statusCode: 200,
      body: JSON.stringify(pets)
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data })
    }
  }
}
