const axios = require('axios')

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
const GCP_KEY = process.env.GCP_KEY

exports.handler = async (event, context) => {
  const response = await axios.get(BASE_URL, {
    params: {
      latlng: event.queryStringParameters.coords,
      key: GCP_KEY
    }
  })
  return response
}
