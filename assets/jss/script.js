console.log("hello")
var apiKey = "cce93c9a1a3559e138f0185459e4b998"
var citySearch = document.getElementById("citySearch");
var searchBtn = document.getElementById("searchBtn");
var lat = "";
var lon = "";

var cityArray = localStorage.cityArray ? JSON.parse(localStorage.cityArray) : []

searchBtn.addEventListener("click", searchBtnClick);
function searchBtnClick(event) {
    let city = citySearch.value;
    console.log(city);
    for (i = 0; i < cityArray.length; i++) {
        if (city === cityArray[i]) {
            cityArray.splice(i, 1);
        }
    }
    cityArray.push(city);
    localStorage.cityArray = JSON.stringify(cityArray);
    weatherForecast(city);
    cityButtons();
} // end of searchBtnClick function definition

function cityButtons() {
    document.querySelector("#cityArray").innerHTML = "";
    for (i = 0; i < cityArray.length; i++) {
        document.querySelector("#cityArray").innerHTML += `<li onclick="weatherForecast('${cityArray[i]}')"class="btn btn-primary mb-1">${cityArray[i]}</li>`
    }
} // end of cityButtons function definition

cityButtons();

function weatherForecast(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(requestUrl)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var weatherIconEl = document.querySelector("#icon");
            var currentIcon = data.weather[0].icon;
            $("#jumboCityName").text(data.name + " " + moment().format("L"));
            weatherIconEl.setAttribute("src", `http://openweathermap.org/img/wn/${currentIcon}.png`);
            weatherIconEl.setAttribute("alt", data.weather[0].main);
            $("#jumboTemp").text("Temp: " + data.main.temp + "℉");
            $("#jumboWind").text("Wind: " + data.wind.speed + " MPH");
            $("#jumboHumidity").text("Humidity: " + data.main.humidity + "%");

            lat = data.coord.lat;
            lon = data.coord.lon;

            var dailyUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey;

            fetch(dailyUrl)
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    $("#jumboUv").text("UV Index: " + data.current.uvi);
                    if (data.current.uvi < 3) {
                        $("#jumboUv").attr("class", "favorable");
                    } else if (data.current.uvi >= 3 && data.current.uvi <= 7) {
                        $("#jumboUv").attr("class", "moderate");
                    } else {
                        $("#jumboUv").attr("class", "severe");
                    }

                    $("#day1").text(moment().add(1, "days").format("L"));
                    $("#temp1").text("Temp: " + data.daily[1].temp.day + "℉");
                    $("#img1").attr("src", "https://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png");
                    $("#wind1").text("Wind: " + data.daily[1].wind_speed + " MPH");
                    $("#humidity1").text("Humidity: " + data.daily[1].humidity + " %");

                    $("#day2").text(moment().add(2, "days").format("L"));
                    $("#temp2").text("Temp: " + data.daily[2].temp.day + "℉");
                    $("#img2").attr("src", "https://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png");
                    $("#wind2").text("Wind: " + data.daily[2].wind_speed + " MPH");
                    $("#humidity2").text("Humidity: " + data.daily[2].humidity + " %");

                    $("#day3").text(moment().add(3, "days").format("L"));
                    $("#temp3").text("Temp: " + data.daily[3].temp.day + "℉");
                    $("#img3").attr("src", "https://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png");
                    $("#wind3").text("Wind: " + data.daily[3].wind_speed + " MPH");
                    $("#humidity3").text("Humidity: " + data.daily[3].humidity + " %");

                    $("#day4").text(moment().add(4, "days").format("L"));
                    $("#temp4").text("Temp: " + data.daily[4].temp.day + "℉");
                    $("#img4").attr("src", "https://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png");
                    $("#wind4").text("Wind: " + data.daily[4].wind_speed + " MPH");
                    $("#humidity4").text("Humidity: " + data.daily[4].humidity + " %");

                    $("#day5").text(moment().add(5, "days").format("L"));
                    $("#temp5").text("Temp: " + data.daily[5].temp.day + "℉");
                    $("#img5").attr("src", "https://openweathermap.org/img/w/" + data.daily[5].weather[0].icon + ".png");
                    $("#wind5").text("Wind: " + data.daily[5].wind_speed + " MPH");
                    $("#humidity5").text("Humidity: " + data.daily[5].humidity + " %");
                }); //end of second fetch
        }); // end of first fetch
} //end of weatherForecast function definition