const request = require('request')

const geocode = (address, callback) => {
  const url = 'http://api.positionstack.com/v1/forward?access_key=a4f1416f126c0a77f3ad01ee1b00d64c&query=' + address

  request({ url, json: true}, (error, { body } = []) => {
    if (error) {
      callback('Unable to connect to location services!')
    } else if (body.data === undefined) {
      callback('Unable to find location, try another search.')
    } else if (body.data.length === 0 ) {
      callback('Unable to find location, try another search.')
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name,
        regionCode: body.data[0].region_code
      })
    }
  })
}

module.exports = geocode