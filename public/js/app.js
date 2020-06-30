const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationText = document.querySelector('#location_text')
const forecastText = document.querySelector('#forecast_text')

weatherForm.addEventListener('submit' , (e)=>{
    e.preventDefault()

    const location = search.value
    console.log(location)

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
            console.log(data.location)
            console.log(data.forecast)
            locationText.textContent = data.location
            forecastText.textContent = data.forecast
            
        })
    })
})