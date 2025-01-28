const weatherForm = document.querySelector(".weatherForm")
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
const apiKey = "73e69b5d953170a80e7f80194393bfc6";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch (error) {
            console.error(error)
            displayError(error)
        };
    } else {
        displayError("Please Enter a City");
    }
});

async function getWeatherData(city) {

    const GeoCode = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    const GeoResponse = await (await fetch(GeoCode)).json();
    console.log(GeoResponse);

    const [cityres, ...rest] = GeoResponse
    console.log(cityres)

    const { lat, lon, ...rest2 } = cityres
    console.log(lat, lon)



    const WeatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    const response = await fetch(WeatherAPI)



    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    console.log(data);
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city;
    cityDisplay.classList.add("cityDisplay")
    card.appendChild(cityDisplay);
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°`;
    tempDisplay.classList.add("tempDisplay")
    card.appendChild(tempDisplay);

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidityDisplay");
    card.appendChild(humidityDisplay);

    descDisplay.textContent = description
    descDisplay.classList.add("descDisplay")
    card.appendChild(descDisplay)

    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add("weatherEmoji");
    card.appendChild(weatherEmoji);



}

function getWeatherEmoji(weatherID) {

    switch (true) {
        case (weatherID >= 200 && weatherID < 300):
            return "⛈️";

        case (weatherID >= 300 && weatherID < 400):
            return "🌧️";

        case (weatherID >= 500 && weatherID < 600):
            return "🌧️";

        case (weatherID >= 600 && weatherID < 700):
            return "🌨️";

        case (weatherID >= 700 && weatherID < 800):
            return "😶‍🌫️";

        case (weatherID === 800):
            return "☀️";

        case (weatherID >= 801 && weatherID < 810):
            return "☁️";

        default:
            return "?";
    }

}

function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}