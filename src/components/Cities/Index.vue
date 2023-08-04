  <template>
    <TransitionGroup class="cities-list" name="list" tag="div">
      <CityCard @dropElem="dropElem" @deleteCity="deleteCity(city.id)" v-for="(city, index) in cities" :index="index" :city="city" :key="city.id" />
    </TransitionGroup>
  </template>
  
  <script setup lang="ts">
    import CityCard from './Card.vue'
    import { City } from '../../types'

    const props = defineProps({
      cities: {
        type: Array<City>,
        require: true
      }
    })

    

    const emit = defineEmits<{
      (e: 'deleteCity', id: number): void,
      (e: 'dropElem', {oldPos, newPos}: {oldPos:number, newPos:number})
    }>()

    const deleteCity = (id) => {
      emit('deleteCity', id)
    }

    const dropElem = ({oldPos, newPos}) => {
      emit('dropElem', {oldPos, newPos})
    }
  </script>
  
  <style scoped>
  
  </style>