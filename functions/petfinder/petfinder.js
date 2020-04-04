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
        location: path.location,
        distance: path.distance,
        page: path.page
      },
      headers: { Authorization: AuthStr }
    })
    return response.data
  }

  /**
  * fetches PET BREEDS BY TYPE
  */
  async function getBreedsByType (token, path) {
    const AuthStr = 'Bearer '.concat(token)
    const response = await axios.get(BASE_URL + `/types/${path.pets}/breeds`, { headers: { Authorization: AuthStr } })
    return response.data
  }

  /* Main Function */
  try {
    // Auth
    userToken = await auth()

    let response
    let params = event.queryStringParameters

    switch (params.task) {
      case 'types':
        response = await getPetTypes(userToken)
        break
      case 'breeds':
        response = await getBreedsByType(userToken, params)
        break
      case 'pets':
        response = await getPetsByType(userToken, params)
        break
    }

    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response
    return {
      statusCode: error.response.status,
      body: JSON.stringify({ status, statusText, headers, data })
    }
  }
}
