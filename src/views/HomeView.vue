<script setup lang="ts">
import { useDevicesStore } from '@/stores/devicesStore';

const devicesStore = useDevicesStore()
</script>

<template>
  <main>
    <div v-for="output in devicesStore.outputs">{{ output.name }}</div>
  </main>
</template>

<style scoped>
</style>