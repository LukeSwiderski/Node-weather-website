const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.tomorrow.io/v4/weather/forecast?location='+ latitude + ',' + longitude + '&apikey=073R9EzY0y1Y8RumJ0aQMTEChAI79GtR&units=imperial'

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (body.type === 'Invalid Query Parameters') {
      callback('Unable to find location, try another search.')
    } else {
      callback(undefined, 
        'It is currently ' + body.timelines.minutely[0].values.temperature + ' degrees out.  There is a ' + body.timelines.minutely[0].values.precipitationProbability + '% chance of rain. The humidity is currently: ' + body.timelines.minutely[0].values.humidity + '%.'
      )
    }
  })
}

module.exports = forecast