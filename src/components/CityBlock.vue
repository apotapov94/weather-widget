<template>
  <div :class="`city-block ${city.description}`">
    <div class="city-block__name">{{ city.cityName }}</div>
    <div class="city-block__temp-info">
      <div class="city-block__left">
        <img class="weather-icon" :src="`https://openweathermap.org/img/w/${city.icon}.png`" alt="">
        <div class="city-block__descr">
          <span class="city-block__temp">{{ city.temp }}°С</span>
          <span>(Feels like {{ city.feelsLike }}°С)</span>
          <span>{{ city.description }}</span>
        </div>
      </div>
      <div class="city-block__right">
        <div class="city-block__weather-info">
          
          <div class="city-block__wind">
            <div class="wind-icon" :style="`transform: rotate(${city.wind.deg}deg)`"><PointerIcon /> </div>{{ city.wind.speed }} m/s
          </div>
          <div class="city-block__pressure">
            <div class="pressure-icon"><PressureIcon /></div> {{ city.pressure }} hPa
          </div>
          <div class="city-block__humidity">
            humidity: {{ city.humidity }}%
          </div>
          <div class="city-block__humidity">
            visibility: {{ city.visibility }}km
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PointerIcon from './icons/PointerIcon.vue'
import PressureIcon from './icons/PressureIcon.vue'

  const props = defineProps({
    city: {
      type: Object,
      required: true
    }
  })
</script>

<style scoped>

</style>