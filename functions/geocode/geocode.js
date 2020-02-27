const axios = require('axios')

const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
const GCP_KEY = process.env.GCP_KEY

exports.handler = async (event, context) => {
  let response
  try {
    response = await axios.get(BASE_URL, {
      params: {
        latlng: event.queryStringParameters.coords,
        key: GCP_KEY
      }
    })
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response.data
    })
  }
}
