<template>
    <!--https://open-ui.org/components/selectlist/-->
    <select>
        <option v-for="device in devicesStore.outputs">{{ device.name }}</option>
    </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from '@/stores/devicesStore'

export default defineComponent({
  name: 'MidiOutputSelect',
  computed: {
    ...mapStores(useDevicesStore),
  }  
})
</script>

<style scoped>

</style>