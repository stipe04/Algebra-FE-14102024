document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const weatherDisplay = document.getElementById('weather-display');

    // **VAŽNO:** Zamijeni 'TVOJ_API_KLJUČ' sa svojim stvarnim OpenWeatherMap API ključem
    const apiKey = '0fb2eb35622bdaaaa3d2ff6dfa9076e8'; 

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            weatherDisplay.innerHTML = '<p style="color: red;">Molimo unesite naziv grada.</p>';
        }
    });

    async function getWeatherData(city) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=hr`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Grad nije pronađen. Provjerite naziv grada.');
                }
                throw new Error(`Došlo je do pogreške: ${response.statusText}`);
            }
            const data = await response.json();
            displayWeather(data);
        } catch (error) {
            weatherDisplay.innerHTML = `<p style="color: red;">Greška: ${error.message}</p>`;
        }
    }

    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        const temperature = main.temp;
        const feelsLike = main.feels_like;
        const humidity = main.humidity;
        const description = weather[0].description;
        const windSpeed = wind.speed; // brzina vjetra u m/s

        weatherDisplay.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Temperatura:</strong> ${temperature}°C</p>
            <p><strong>Osjećaj kao:</strong> ${feelsLike}°C</p>
            <p><strong>Opis:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p><strong>Vlažnost:</strong> ${humidity}%</p>
            <p><strong>Brzina vjetra:</strong> ${windSpeed} m/s</p>
        `;
    }
});