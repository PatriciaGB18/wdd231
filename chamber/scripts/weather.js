async function loadWeather() {

    const lat = -25.546;
    const lon = -54.588;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode&current_weather=true&timezone=auto`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const currentWeatherCard = document.getElementById('current-weather-card');
        if (data.current_weather) {
            const cw = data.current_weather;
            currentWeatherCard.innerHTML = `
        <h2>Current Weather</h2>
        <div class="weather-icon">
      <img src="images/sun1.webp" alt="Sun and Cloud Icon" />
    </div>
        <p>Temperature: ${cw.temperature}&deg;C</p>
        <p>Wind: ${cw.windspeed} km/h</p>
        <p>Time: ${cw.time}</p>
      `;
        }
        const forecastCard = document.getElementById('forecast-card');
        if (data.daily) {
            let forecastHTML = '<h2>Weather Forecast</h2>';
            for (let i = 0; i < data.daily.time.length && i < 3; i++) {
                forecastHTML += `<p>${data.daily.time[i]}: High <strong>${data.daily.temperature_2m_max[i]}&deg;C</strong>, Low <strong>${data.daily.temperature_2m_min[i]}&deg;C</strong></p>`;
            }
            forecastCard.innerHTML = forecastHTML;
        }


    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

loadWeather();
