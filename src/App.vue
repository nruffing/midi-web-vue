<template>
  <!-- <header>
  </header> -->
  <RouterView />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useDevicesStore } from './stores/devicesStore'

const devicesStore = useDevicesStore()

onMounted(() => {
  devicesStore.initialize()
})
</script>

<style scoped>
</style>
