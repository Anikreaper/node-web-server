const path = require('path')
const express = require('express')
const geocoding = require('../utils/geocode')
const forecast = require("../utils/forecast")
var bodyParser = require("body-parser");

const app = express()
var port = process.env.PORT || 3000
const hbs = require("hbs")
app.use(bodyParser.urlencoded({
    extended: true
}));

const publicDirectoryPath = path.join(__dirname, '../public')
app.set('views', path.join(__dirname, '../templates/views')); //views
const partialPath = path.join(__dirname, '../templates/partials'); //partials
hbs.registerPartials(partialPath)




app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Anik Mondal",
        header: "Very first Node JS Application"
    })
})

app.get('/weather', (req, res) => {

    res.render('weather', {
        title: "Weather App",
        header: "This is Project in NodeJS",
    })

})



app.post('/weather', (req, res) => {

    geocoding(req.body.location, (error, data) => {
        if (error == undefined) {
            // console.log(data)
            // return false
            forecast(data, (err, data) => {
                if (err) {
                    return res.send({
                        err
                    })
                } else {
                    res.render('weather', {
                        title: "Weather App",
                        location: data.location.name,
                        header: "This is Project in NodeJS",
                        temperature: data.current.temperature,
                        icon: data.current.weather_icons
                    })


                    console.log("The temperature of " + data.location.name + " is " + data.current.temperature);
                }
            })
        } else {
            return res.render('weather',{
                error:error
            })
        }
    })

})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: "Contact",
        name: "Web Developer"
    })
})

app.get("*", (req, res) => {
    res.send("My 404 page")
})



app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
