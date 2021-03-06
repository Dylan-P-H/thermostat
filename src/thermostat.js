'use strict';


class Thermostat {
  constructor() {
    this.MINIMUM_TEMPERATURE = 10;
    this.DEFAULT_TEMPERATURE = 20;
    this.temperature = this.DEFAULT_TEMPERATURE;
    this.powerSavingMode = true;
    this.MAX_LIMIT_PSM_ON = 25;
    this.MAX_LIMIT_PSM_OFF = 32;
    this.MEDIUM_ENERGY_USAGE_LIMIT = 18;
    this.HIGH_ENERGY_USAGE_LIMIT = 25;
  }

  energyUsage() {
    if (this.temperature < this.MEDIUM_ENERGY_USAGE_LIMIT) {
      return 'low-usage';
    }
    if (this.temperature <= this.HIGH_ENERGY_USAGE_LIMIT) {
      return 'medium-usage';
    }
    return 'high-usage';
  }

  resetTemperature() {
    this.temperature = 20;
  }

  getCurrentTemperature() {
    return this.temperature;
  }

  isPowerSavingModeOn() {
    return this.powerSavingMode === true;
  }

  up() {
    if (this.isMaximumTemperature()) {
      return true;
    }
    this.temperature += 1;
  }

  down() {
    if (this.isMinimumTemperature() === true) {
      return true;
    }
    this.temperature -= 1;
  }

  isMinimumTemperature() {
    return this.temperature === this.MINIMUM_TEMPERATURE;
  }

  isMaximumTemperature() {
    if (this.isPowerSavingModeOn() === false) {
      return this.temperature === this.MAX_LIMIT_PSM_OFF;
    }
    return this.temperature === this.MAX_LIMIT_PSM_ON;
  }

  switchPowerSavingModeOff() {
    this.powerSavingMode = false;
  }

  switchPowerSavingModeOn() {
    this.powerSavingMode = true;
  }
}


document.querySelector('#select-city').addEventListener('submit', (event) => {
  event.preventDefault();
  const city = document.querySelector('#current-city').value;
  displayWeather('London');
  displayWeather(city);
})

// To make simpler sort of like a web helper
const displayWeather = (city) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3d9eb01d4de82b9b8d0849ef604dbed&units=metric`

  fetch(url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      document.querySelector('#current-temperature').innerText = data.main.temp;
    })
}