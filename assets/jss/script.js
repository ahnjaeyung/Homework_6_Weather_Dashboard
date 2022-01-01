console.log("hello")
var apiKey = "cce93c9a1a3559e138f0185459e4b998"
var cityName = "Minneapolis"
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

fetch(requestUrl)
    .then(function (response){
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })