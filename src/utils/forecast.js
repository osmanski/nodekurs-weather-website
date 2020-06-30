const request = require('postman-request')

const forecast = (longitude, latitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a8eb3a4ed9748f4eaaa781d1dab4c1f6&query='+latitude+','+longitude+''
    request({url,json:true}, (error,response)=>{
        if(error){
            callback('mamy problem z polaczeniem')
        }else if(response.body.error){
            callback(response.body.error)
        }else{
            callback(undefined, {
                temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                prec: response.body.current.precip
            })
        }
    })
}

module.exports = forecast