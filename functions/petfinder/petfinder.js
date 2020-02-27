const axios = require('axios')

exports.handler = async function (event, context) {
  const BASE_URL = 'https://api.petfinder.com/v2'
  const AUTH_URL = 'https://api.petfinder.com/v2/oauth2/token'
  const data = {
    grant_type: 'client_credentials',
    client_id: process.env.PETFINDER_CLIENT_ID,
    client_secret: process.env.PETFINDER_CLIENT_SECRET
  }
  let userToken = null
  /**
   * Checks if user has a token
   * if not, requests and returns one from petfinder API
   */
  async function auth () {
    if (userToken === null) {
      console.log('fetching token...')
      const newToken = await axios.post(AUTH_URL, data)
      return newToken.data.access_token
    } return userToken
  }

  /**
 * fetches ALL PET TYPES
 */
  async function getPetTypes (token) {
    const AuthStr = 'Bearer '.concat(token)
    const response = await axios.get(BASE_URL + '/types', { headers: { Authorization: AuthStr } })
    const petTypes = []
    response.data.types.forEach(element => {
      let url = element['_links']['self']['href']
      // remove "/v2/types/"
      url = url.substring(10)
      const animal = {
        name: element['name'],
        slug: url
      }
      petTypes.push(animal)
    })
    return petTypes
  }

  /**
* fetches PETS BY TYPE
*/
  async function getPetsByType (token, path) {
    const AuthStr = 'Bearer '.concat(token)
    const response = await axios.get(BASE_URL + '/animals', {
      params: {
        type: path.pets,
        location: path.location
      },
      headers: { Authorization: AuthStr }
    })
    return response.data.animals
  }

  /* Main Function */
  try {
    // Auth
    userToken = await auth()

    let pets
    if (event.queryStringParameters.pets === 'types') {
      pets = await getPetTypes(userToken)
    } else pets = await getPetsByType(userToken, event.queryStringParameters)

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
