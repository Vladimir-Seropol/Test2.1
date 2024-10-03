export default class Weather {
    constructor() {
        this.apiKey = '260bb157394fea4d450e148689e0c3d5';
    }
    
    renderWeather(container) {
        container.innerHTML = 
            `<form id="weather-form">
            <p class="city-name" id="city-name"></p>
                <div  class="input-none" id="input">
                     <input type="text" id="city" name="city"  placeholder="Введите название города">
                     <button type="submit" id="weather-button" class="button btn">Показать погоду</button>
                </div>
                <p id="loader" style="display: none;">Загрузка...</p>
                
                <p id="temperature"></p>
                <p id="current-weather"></p>
            </form>`;

        const form = document.getElementById('weather-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 
            this.getWeather();
        });

       
        const savedCity = localStorage.getItem('lastCity');
        if (savedCity) {
            document.getElementById('city').value = savedCity;
            this.getWeather(); 
        }
    }

    async getWeather() {
        const formData = new FormData(document.getElementById('weather-form'));
        const city = formData.get('city')?.trim() || 'Краснодар';

        this.showLoader();

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                this.updateWeatherDisplay(data);
                
                const icon = document.createElement('img');
                icon.classList.add('img-icon');
                icon.src = 'images/ic_info_outline_48px.svg'; 
                document.getElementById('city-name').innerText = city;
                document.getElementById('city-name').appendChild(icon);

               
                localStorage.setItem('lastCity', city);
                document.getElementById('city').value = '';


              
                const cityNameElement = document.getElementById('city-name');
                const cityInputElement = document.getElementById('input');
        
                cityNameElement.addEventListener('click', () => {
                    if (city) {
                        cityInputElement.classList.remove('input-none');
                        cityInputElement.classList.add('input-block');
                    }
                });

              
                
                cityInputElement.classList.remove('input-block');
                cityInputElement.classList.add('input-none');
            } else {
                alert(`Ошибка: ${data.message}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Произошла ошибка при получении данных о погоде.');
        } finally {
            this.hideLoader();
        }
    }

    updateWeatherDisplay(weatherData) {
        document.getElementById('city-name').innerText = weatherData.name;
        document.getElementById('temperature').innerText = `Температура: ${weatherData.main.temp}°C`;
        document.getElementById('current-weather').innerText = `Погода: ${weatherData.weather[0].description}.`;
    }

    showLoader() {
        document.getElementById('loader').style.display = 'block';
    }

    hideLoader() {
        document.getElementById('loader').style.display = 'none';
    }
    
 
}