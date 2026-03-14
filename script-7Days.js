
async function getWeather(cityParam) {
    const city = cityParam || document.getElementById("cityInput")?.value;
    const resultDiv = document.getElementById("weatherResult");

    if (!city) {
        resultDiv.innerHTML = "Please enter a city name.";
        return;
    }

    const url = `http://localhost:3000/weather?city=${city}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();
        if (!data.location) {
            resultDiv.innerHTML = "Weather data not found.";
            console.log(data);
            return;
        }

        const location = data.location.name;
        const current = data.current;
        updateBackground(current.condition.text);

        const forecast = data.forecast.forecastday;

        document.body.classList.toggle("night-mode", current.is_day === 0);

        // const cards = forecast.map(day => `
        //     <div class="forecast-card">
        //         <h4>${day.date}</h4>
        //         <div class="forecast-day">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>

        //         <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
        //         <p>${day.day.condition.text}</p>
        //         <div class="temp">${day.day.avgtemp_c}°C</div>
        //     </div>
        // `).join('');

        const cards = forecast.map((day, index) => `
            <div class="forecast-card" style="animation-delay: ${index * 100}ms">
                <h4>${day.date}</h4>
                <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" />
                <p>${day.day.condition.text}</p>
                <p>${day.day.avgtemp_c}°C</p>
            </div>
        `).join('');



        resultDiv.innerHTML = `
        <h2 class="location-title">${location}</h2>
        <div class="weather-info">
            <img src="https:${current.condition.icon}" alt="${current.condition.text}" />
            <span>${current.condition.text}</span>
        </div>
        
        <p>🌡️ <strong>${current.temp_c}°C</strong></p>
        <p>🧊 Feels Like: <strong>${current.feelslike_c}°C</strong></p>
        <p>💧 Humidity: <strong>${current.humidity}%</strong></p>
        <p>💨 Wind: <strong>${current.wind_kph} kph ${current.wind_dir}</strong></p>
        <p>☀️ UV Index: <strong>${current.uv}</strong></p>

        
        <h3>3-Day Forecast</h3>
        <div class="forecast-container">${cards}</div>
    `;



    } catch (error) {
        resultDiv.innerHTML = "Error: " + error.message;
    }
}
function updateBackground(weatherDescription) {
    const body = document.body;

    if (/sunny/i.test(weatherDescription)) {
        body.style.background = "linear-gradient(to top,rgba(156, 141, 103, 0.98),rgba(248, 182, 0, 0.65))";
    } else if (/cloud/i.test(weatherDescription)) {
        body.style.background = "linear-gradient(to top, #bdc3c7, #2c3e50)";
    } else if (/rain|drizzle/i.test(weatherDescription)) {
        body.style.background = "linear-gradient(to top, #4b79a1, #283e51)";
    } else if (/storm|thunder/i.test(weatherDescription)) {
        body.style.background = "linear-gradient(to top, #232526, #414345)";
    } else if (/snow/i.test(weatherDescription)) {
        body.style.background = "linear-gradient(to top, #e6dada, #274046)";
    } else if (/fog|mist|haze/i.test(weatherDescription)) {
        body.style.background = "linear-gradient(to top, #757f9a, #d7dde8)";
    } else {
        // Default
        body.style.background = "linear-gradient(to top, #0f2027, #203a43, #2c5364)";
    }
}







