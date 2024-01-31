const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// define paths/express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: "Luke Swiderski"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Luke Swiderski"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: "Some helpful text",
    title: 'Help',
    name: 'Luke Swiderski'
  })
})

app.get('/Weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a location'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location, regionCode } = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }
     forecast(latitude, longitude, (error, forecastData) => {
       if (error) {
         return res.send({
           error: error
         }) 
       }

       res.send({
         location: location, 
         region: regionCode,
         forecast: forecastData,
         address: req.query.address 
       })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    message: "No help article found."
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: "404: Oops, it looks like someone is getting fired!"
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})