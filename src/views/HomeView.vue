<template>
  <main>
    <MidiOutputSelect />
    <MidiConfigSelect />
    <MidiChannelSelect />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MidiOutputSelect from '@/components/MidiOutputSelect.vue'
import MidiChannelSelect from '@/components/MidiChannelSelect.vue'
import MidiConfigSelect from '@/components/MidiConfigSelect.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    MidiOutputSelect,
    MidiChannelSelect,
    MidiConfigSelect,
  },
})
</script>

<style scoped></style>
