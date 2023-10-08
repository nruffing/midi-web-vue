<template>
  <main>
    <MidiOutputSelect />
    <MidiChannelSelect />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MidiOutputSelect from '@/components/MidiOutputSelect.vue'
import MidiChannelSelect from '@/components/MidiChannelSelect.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    MidiOutputSelect,
    MidiChannelSelect,
  },
})
</script>

<style scoped></style>
