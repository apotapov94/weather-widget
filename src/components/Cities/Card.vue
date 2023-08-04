<template>
  <div class="city-card" 
    :draggable="dragMode" 
    @dragstart="onDragstart($event, index)" 
    :id="city.id"
    @drop="onDrop($event, index)" 
    @dragover="onDragOver($event)" 
    @dragleave="onDragLeave($event)" 
    @dragenter="onDragenter($event, index)">
    <div class="city-card__move"><BurgerIcon @mouseover="changeDragMode" @mouseleave="changeDragMode(false)" /></div>
    {{ city.cityName }}
    <div class="city-card__remove"><RemoveIcon @click="deleteCity" /></div>
  </div>
</template>

<script setup lang="ts">
  import RemoveIcon from '../icons/RemoveIcon.vue'
  import BurgerIcon from '../icons/BurgerIcon.vue'
  import { ref } from 'vue'

  const props = defineProps({
    city: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  })

  let dragMode = ref(false)

  const emit = defineEmits<{
    (e: 'deleteCity', id: number): void,
    (e: 'dropElem', {oldPos, newPos}: {oldPos:number, newPos:number})
  }>()

  const deleteCity = () => {
    emit('deleteCity', props.city.id)
  }

  const changeDragMode = (mode?:boolean) => {
    if(mode === false){
      dragMode.value = mode
    } else {
      dragMode.value = true
    }
  }

  const onDragstart = (e, item) => {      
      console.log(e.target)
      e.target.classList.add('drag')
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('oldPos', item)
  }
  const onDragOver = (e) => {
    e.preventDefault();
    
  }
  const onDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove('ready-to-drop')
  }
  const onDrop = (e, newPos) => {
      const oldPos = e.dataTransfer.getData('oldPos')

      e.target.classList.remove('ready-to-drop')
      emit('dropElem', {oldPos: parseInt(oldPos), newPos})
  }
  const onDragenter = (e, columnId) => {
      console.log(columnId)
      e.target.classList.add('ready-to-drop')
  }

</script>

<style scoped>

</style>