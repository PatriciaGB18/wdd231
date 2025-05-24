const apiKey = 'bea053928b82c9e73fbb43ddcaccf354';
const lat = -25.546;
const lon = -54.588;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=en`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=en`;

async function loadWeather() {
    try {
        const response = await fetch(currentWeatherURL);
        if (!response.ok) throw new Error("Error fetching weather data.");
        const data = await response.json();

        const temp = data.main.temp.toFixed(1);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById('current-temp').textContent = `${temp}°C`;
        document.getElementById('current-desc').innerHTML = `
            <img src="${iconURL}" alt="${description}" width="50" height="50">
            ${description.charAt(0).toUpperCase() + description.slice(1)}
        `;
    } catch (error) {
        console.error("Error loading weather data:", error);
        document.getElementById('current-temp').textContent = "Error loading temperature";
        document.getElementById('current-desc').textContent = "Error loading weather";
    }
}


async function loadForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error("Error fetching forecast.");
        const data = await response.json();

        const forecastList = document.getElementById('forecast-list');
        forecastList.innerHTML = '';

        const filteredForecast = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

        filteredForecast.slice(0, 3).forEach(forecast => {
            const temp = forecast.main.temp.toFixed(1);
            const desc = forecast.weather[0].description;
            const icon = forecast.weather[0].icon;
            const date = new Date(forecast.dt_txt);
            const day = date.toLocaleDateString('en-US', { weekday: 'long' });

            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${day}:</strong> 
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="40"> 
                ${temp}°C, ${desc.charAt(0).toUpperCase() + desc.slice(1)}
            `;

            forecastList.appendChild(li);
        });

    } catch (error) {
        console.error("Error loading forecast:", error);
        document.getElementById('forecast-list').innerHTML = "<li>Error loading forecast</li>";
    }
}

loadWeather();
loadForecast();

function loadWeatherWidget() {
    const container = document.getElementById("weather-widget");
    container.innerHTML = "";
    let widgetId = window.innerWidth <= 768 ? 15 : 11;
    let widgetContainerId = `openweathermap-widget-${widgetId}`;

    let widgetDiv = document.createElement("div");
    widgetDiv.id = widgetContainerId;
    container.appendChild(widgetDiv);
    let script = document.createElement("script");
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);

    window.myWidgetParam = [{
        id: widgetId,
        cityid: '3463030',
        appid: 'bea053928b82c9e73fbb43ddcaccf354',
        units: 'metric',
        containerid: widgetContainerId
    }];
}
window.onload = loadWeatherWidget;
window.onresize = loadWeatherWidget;

