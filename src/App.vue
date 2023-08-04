<template>
  <div class="content">
    <div class="settings-icon">
      <SettingsIcon @click="toggleSettings" />
    </div>
    
    
    
    <div v-if="!state.showSettings">
      <TransitionGroup class="weather-wrap" name="list" tag="div">
        <CityBlock v-for="city in state.cities" :city="city" :key="city.id" />
      </TransitionGroup>
    </div>
    <CitiesList @dropElem="dropElem" @deleteCity="deleteCity" :cities="state.cities" v-if="state.showSettings" />
    <div class="add-location" v-if="state.showAddLocation || state.showSettings">
      <p>Add location:</p>
      <input @input="getCity" type="text" v-model="state.city" >
      <div v-if="state.searchClue" class="search-clue">
        <span @click="getWeather(item.lat, item.lon)" v-for="item in state.searchClue">{{ item.name }}, {{ item.country }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CityBlock from './components/CityBlock.vue'
  import CitiesList from './components/Cities/Index.vue'
  import { reactive, onMounted } from 'vue'
  import axios from 'axios'
  import SettingsIcon from './components/icons/SettingsIcon.vue'


  const state = reactive({ 
    city: '',
    cities: [],
    searchClue: null,
    showAddLocation: true,
    showSettings: false,
  })
  const api = '119f03603082db2dd907d2d5d695117b'

  onMounted(() => {
    if(JSON.parse(localStorage.cities).length > 0){
      state.showAddLocation = false
      state.cities = JSON.parse(localStorage.cities)
    }
  })

  const deleteCity = (id:number) => {
    const newCities = state.cities.filter((city) => city.id !== id)
    state.cities = newCities
    localStorage.cities = JSON.stringify(state.cities)
  } 

  async function getCity() {
    try {
      const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${state.city}&limit=5&appid=${api}`);
      console.log(response);
      state.searchClue = response.data
    } catch (error) {
      console.error(error);
    }
  }
  async function getWeather(lat:string, lon:string) {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`);
      console.log(response);

      const temperature = response.data.main
      const wind = response.data.wind
      const weather = response.data.weather[0]

      const newWeatherBlock = {
        id: response.data.id,
        cityName: response.data.name,
        region: response.data.sys.country,
        temp: Math.round(temperature.temp),
        pressure: temperature.pressure,
        humidity: temperature.humidity,
        feelsLike: Math.round(temperature.feels_like),
        description: weather.main,
        icon: weather.icon,
        visibility: response.data.visibility/1000,
        wind: {
          speed: wind.speed,
          deg: wind.deg
        },
      }
      state.cities.push(newWeatherBlock)
      state.showAddLocation = false
      state.city = ''
      state.searchClue = null

      localStorage.cities = JSON.stringify(state.cities)
    } catch (error) {
      console.error(error);
    }
  }

  function toggleSettings(){
    state.showSettings = !state.showSettings
  }

  const dropElem = ({oldPos, newPos}) => {
    console.log(oldPos, newPos)
    const oldIndex = parseInt(oldPos)
    const curElem = state.cities[oldIndex]
    state.cities.splice(oldIndex, 1)
    const newCities = [
      ...state.cities.slice(0, newPos),
      curElem,
      ...state.cities.slice(newPos),
    ]
    state.cities = newCities
    console.log(newCities)
    localStorage.cities = JSON.stringify(state.cities)
  }

</script>

<style lang="scss" scoped>

</style>