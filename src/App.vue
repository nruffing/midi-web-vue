<template>
  <RouterView v-if="devicesStore.outputs" />
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
  async mounted() {
    await this.devicesStore.initialize()
  },
})
</script>

<style scoped></style>
