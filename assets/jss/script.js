console.log("hello")
var apiKey = "cce93c9a1a3559e138f0185459e4b998"
var citySearch = document.getElementById("citySearch");
var searchBtn = document.getElementById("searchBtn");
var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=" + apiKey;

var lat = "";
var lon = "";

var cityArray = localStorage.cityArray ? JSON.parse(localStorage.cityArray) : []

searchBtn.addEventListener("click", searchBtnClick);
function searchBtnClick(event) {
    let city = citySearch.value;
    console.log(city);
    cityArray.push(city);
    localStorage.cityArray = JSON.stringify(cityArray);
    weatherForecast(city);

}
function weatherForecast(city){
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            $("#jumboCityName").text(data.name + " " + moment().format("L"));
            $("#jumboTemp").text("Temperature: " + data.main.temp + "℉");
            $("#jumboWind").text("Wind: " + data.wind.speed + " MPH");
            $("#jumboHumidity").text("Humidity: " + data.main.humidity + "%");
        });





// fetch(uvUrl)
//     .then(function (response) {
//         console.log(response);
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data)
//     })
    } //end of weatherForecast function definition