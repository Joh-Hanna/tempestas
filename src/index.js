function refreshWeather(response) {
let currentTemperature = document.querySelector("#current-temperature");
let currentCity = document.querySelector("#current-city");
currentTemperature.innerHTML = Math.round(response.data.temperature.current)
currentCity.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");