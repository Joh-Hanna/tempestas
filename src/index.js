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

function displayForecast() {
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
    let forecastHtml = "";
  
    days.forEach(function (day) {
      forecastHtml =
        forecastHtml +
        `
        <div class="forecast-day">
          <div class="forecast-date">${day}</div>
          <div class="icon">🌤️</div>
          <div class="forecast-temperatures">
            <div class="forecast-max-temperature">
              <strong>15º</strong>
            </div>
            <div class="forecast-min-temperature">9º</div>
          </div>
        </div>
      `;
    });
  
    let forecastElement = document.querySelector("#weather-forecast");
    forecastElement.innerHTML = forecastHtml;
  }



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
displayForecast()
