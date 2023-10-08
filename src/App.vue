<template>
  <!-- <header>
  </header> -->
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from './stores/devicesStore'

export default defineComponent({
  name: 'App',
  computed: {
    ...mapStores(useDevicesStore),
  },
  mounted() {
    this.devicesStore.initialize()
  },
})
</script>

<style scoped>
</style>
