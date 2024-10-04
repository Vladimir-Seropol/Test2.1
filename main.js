import Weather from './src/Weather.js';
import Tasks from './src/Tasks.js';
import BackgroundSetter from './src/BackgroundSetter.js';
import './css/style.css';
import Clock from './src/Clock.js';

class App {
    constructor() {
       
        this.weather = new Weather();
      
        this.render();
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = 
            
           ` <div class="container" id="container">
                <div class="clock">
                    <div id="time"></div>
                    <div id="date"></div>
                </div>
                <div class="weather-widget"></div>
                 <input type="checkbox" id="checkbox-burger" class="input-hamburger">
			<label for="checkbox-burger" class="hamburger"></label>
                <form class="form">
                    <div class="input">
                        <textarea id="task" placeholder="Задача*"></textarea>
                        <button id="plus" type="submit" class="button btn">Добавить задачу</button>
                    </div>
                    <div class="tasks">
                        <ol id="plusTask"></ol>
                    </div>
                </form>
            </div>`;

           this.background = new BackgroundSetter('container');

           this.clock = new Clock('time', 'date');

           this.tasks = new Tasks();

        this.weather.renderWeather(app.querySelector('.weather-widget'));
        this.tasks.bindEvents();

        document.cookie = "_gh_sess=value; SameSite=None; Secure";
    }
}

window.onload = () => {
    new App();
};





