 const path = require('path')
 const express = require('express')
 const hbs = require('hbs')
 const geocode = require('./utils/geocode')
 const forecast = require('./utils/forecast')





 const app = express()
 const port = process.env.PORT || 3000
 const directorypath = path.join(__dirname, '../node-app/public')
 const viewspath = path.join(__dirname, '../node-app/templates/views')
 const partialspath = path.join(__dirname, '../node-app/templates/partials')
 app.set('view engine', 'hbs')
 app.set('views', viewspath)
 hbs.registerPartials(partialspath)

 app.use(express.static(directorypath))

 // console.log(directorypath)
 // app.get('', (req, res) => {
 //     res.send([{ weather: 'sunny', location: 'bangalore', temperature: '28c' }, { weather: 'rainy', location: 'Tamilnadu', temperature: '17c' }])
 // })

 // app.get('/home', (req, res) => {
 //     res.send('<h1>hy shiva you are stud</h1>')
 // })


 app.get('/', (req, res) => {
         res.render('index', {
             location: 'bangalore',
             namee: 'rakshith'
         })
     })
     //  app.get('/home', (req, res) => {
     //      res.render('home')
     //  })
     //  app.get('/about', (req, res) => {
     //          res.render('about')
     //      })
     //   
 app.get('/weather', (req, res) => {
     if (!req.query.address) {
         return res.send({
             error: "you must provide address term"
         })
     }
     geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
         if (error) {
             return res.send({ error })
         }
         forecast(latitude, longitude, (error, forecastData) => {
             if (error) {
                 return res.send({ error })
             }
             res.send({
                 forecast: forecastData,
                 location,
                 address: req.query.address
             })
         })
     })
 })



 app.get('*', (req, res) => {
     res.send('404 error page not found')
 })


 app.listen(port, () => {
     console.log('port is running at port ' + port)
 })