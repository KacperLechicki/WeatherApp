'use strict';

const input = document.querySelector('.weather__top-cityInput');
const error = document.querySelector('.error-info');
const button = document.querySelector('.weather__top-button');
const cityName = document.querySelector('.weather__bottom-cityName');
const image = document.querySelector('.weather__bottom-icon');
const weather = document.querySelector('#weather');
const temperature = document.querySelector('#temperature');
const humidity = document.querySelector('#humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=7e6ba3e6f91615410d80539ca40e2771';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'London';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
		.get(URL)
		.then((res) => {
			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + '°C';
			humidity.textContent = hum + '%';
			weather.textContent = status.main;

			error.textContent = '';
			input.value = '';

			if (status.id >= 200 && status.id < 300) {
				image.setAttribute('src', './img/thunderstorm.png');
			} else if (status.id >= 300 && status.id < 400) {
				image.setAttribute('src', './img/drizzle.png');
			} else if (status.id >= 500 && status.id < 600) {
				image.setAttribute('src', './img/rain.png');
			} else if (status.id >= 600 && status.id < 700) {
				image.setAttribute('src', './img/ice.png');
			} else if (status.id >= 700 && status.id < 800) {
				image.setAttribute('src', './img/fog.png');
			} else if (status.id == 800) {
				image.setAttribute('src', './img/sun.png');
			} else if (status.id > 800 && status.id < 900) {
				image.setAttribute('src', './img/cloud.png');
			} else {
				image.setAttribute('src', './img/unknown.png');
			}
		})
		.catch(() => (error.textContent = 'Invalid city name!'));
};

const enterCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

button.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);
getWeather();
