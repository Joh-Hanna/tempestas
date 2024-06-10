function refreshWeather(response) {
let currentTemperature = document.querySelector("#current-temperature");
let currentCity = document.querySelector("#current-city");
let weatherDescription = document.querySelector("#description");
let humidity = document.querySelector("#humidity");
let windspeed = document.querySelector("#windspeed");
let time = document.querySelector("#time");
let date = new Date(response.data.time*1000);
let icon = document.querySelector("#icon");
icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-image">`;

currentTemperature.innerHTML = Math.round(response.data.temperature.current);
currentCity.innerHTML = (response.data.city).trim();
weatherDescription.innerHTML = response.data.condition.description;
humidity.innerHTML = `${response.data.temperature.humidity}%`;
windspeed.innerHTML = `${response.data.wind.speed}km/h`;
time.innerHTML = formatedDate(date);

getForecast(response.data.city);
}

function formatedDate(date) {

let hour = date.getHours();
let minutes = date.getMinutes()
let days = [`Sunday`, `Monday`, `Tuesday`, `Wedenesday`, `Thursday`, `Friday`, `Saturday`];
let day = days[date.getDay()];

if (minutes <10) {
    minutes = `0${minutes} `
}
if (hour < 10) {
    hour = `0${hour}`
}

return `${day} ${hour}:${minutes} `;
}

function searchCity(city) {
 let apiKey = "9240352440ao0101at80cbf93b35d00b"; 
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
axios.get(apiUrl).then(refreshWeather);
}


function handleSearchSubmit(event) {
event.preventDefault();
let searchInput = document.querySelector("#search-input");

searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp*1000);
    let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days[date.getDay()];
}

function getForecast(city) {
let apiKey = "9240352440ao0101at80cbf93b35d00b";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {

    
    let forecastHtml = "";
  
    response.data.daily.forEach(function (day, index) {
      if (index < 5) {
      
        forecastHtml =
        forecastHtml +
        `
        <div class="forecast-day">
          <div class="forecast-date">${formatDay(day.time)}</div>
           <img src="${day.condition.icon_url}" class="icon"/> 
          <div class="forecast-temperatures">
            <div class="forecast-max-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            
            <span class="forecast-min-temperature">${Math.round(day.temperature.minimum)}º</span>
            </div>
          </div>
        </div>
      `;
      }
    });
  
    let forecastElement = document.querySelector("#weather-forecast");
    forecastElement.innerHTML = forecastHtml;
  }



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");

