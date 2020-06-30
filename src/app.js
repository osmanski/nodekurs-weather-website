const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const express = require('express')
const { resolveSoa } = require('dns')
const hbs = require('hbs')

console.log('git test')

const app = express()

const port = process.env.PORT || 3000

//define paths for Express conf
const publicDirectoryPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')
 
//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mario'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        helpText: 'some text' ,
        name: 'Mario'
    })
})
app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help me',
        message: 'to jest message',
        name: 'Mario'

    })
})

app.get('', (req, res) =>{  //co ma się stać gdy ktos wejdzie na strone
    res.send('<h1>hello ex</h1>')
}) 

app.get('/weather', (req, res) =>{  //co ma się stać gdy ktos wejdzie na strone

    if(!req.query.address){
        return res.send({
            error: 'you must povide address'
        })
    }
    const address2 = req.query.address
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return console.log('blad')
        }
        //console.log('la: ' + latitude + ' lo: ' + longitude + ' loc: '+ location)
             forecast(latitude, longitude, (error, {temp, feelslike, prec}) => {
                res.send(
                    {
                        jajko: 'jajko',
                        forecast: 'Temperature: ' + temp + '. Temperatura odczuwalna: '+ feelslike+'. Prec: ' +prec ,
                        location: location,
                        address: req.query.adress
            
                    }
                        
                )
                console.log('Lokalizacja: ' + location + '. Temperatura: ' + temp + '. Temperatura odczuwalna: '+ feelslike+'Szansa opadow: ' + prec + '.')
             })
        
        
    })
   // const newadress = geocode(req.query.address,)
    
    
}) 
app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'you must povide search'
        })
    }
    console.log(req.query.search)
    
    res.send({
        products: []
        })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 Help',
        message: 'Help article not found',
        name: 'Mario'

    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        message: 'Page not found',
        name: 'Mario'

    })
})

app.listen(port, ()=> {
    console.log('server odpalony na porcie ' + port)
})