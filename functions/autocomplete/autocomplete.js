const Client = require('@googlemaps/google-maps-services-js').Client

const GCP_KEY = process.env.GCP_KEY

exports.handler = async (event, context) => {
  const client = new Client({})
  let response

  try {
    response = await client.placeAutocomplete({
      params: {
        input: event.queryStringParameters.input,
        key: GCP_KEY,
        components: 'country:us',
        types: '(cities)'
      },
      timeout: 1000 // milliseconds
    })
  } catch (e) {
    console.log(e)
    return {
      statusCode: e.statusCode || 500,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response.data.predictions
    })
  }
}
