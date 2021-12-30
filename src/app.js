const path = require('path')
const express = require('express')
const geocoding = require('../utils/geocode')
const forecast = require("../utils/forecast")

const app = express()
const hbs = require("hbs")
const publicDirectoryPath = path.join(__dirname,'../public')
app.set('views', path.join(__dirname,'../templates/views'));//views
const partialPath = path.join(__dirname,'../templates/partials');//partials
hbs.registerPartials(partialPath)




app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name: "Anik Mondal",
        header:"This header"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
    return res.send({
            error:"Location query in parameter is required while using weather app"
        })
    }

    geocoding(req.query.location, (error, data) => {
        if(error == undefined){
          // console.log(data)
          // return false
        forecast(data,(err,data)=>{
            res.render('weather', {
                title: "Weather App",
                location: data.location.name,
                header: "This is Project in NodeJS",
                temperature:data.current.temperature


            })

            console.log("The temperature of "+data.location.name+" is "+data.current.temperature);
          })
        }
        else{
          console.log('Error',error)
        }
        })
})

app.get('/contact',(req, res)=>{
    res.render('contact',{
        title:"Contact",
        name: "Web Developer"
    })
})

app.get("*",(req,res)=>{
    res.send("My 404 page")
})



app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})