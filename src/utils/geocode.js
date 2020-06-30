const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiY2VyZWJyb3MiLCJhIjoiY2tieXJ2NTlnMHgyZjJybzR6OGZiemdiNSJ9.aodT1mHVoQHy_teMrVms6Q&limit=1'
    
    request({url, json:true}, (error, response) =>{
       
        if(error){
            callback('nie udalo sie polaczyc')
        }else if(response.body.features.length === 0){
            callback('jakis inny blad', undefined)
        }else{
            //const {latitude, longitude, location} =
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name          
            })
        }
    })
}

module.exports = geocode