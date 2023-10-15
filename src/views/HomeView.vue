<template>
  <main>
    <ControlSetList />
    <TestControl />
    <MidiLog />
  </main>
</template>

<script lang="ts">
import ControlSetList from '@/components/ControlSetList.vue'
import TestControl from '@/components/TestControl.vue'
import MidiLog from '@/components/MidiLog.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    ControlSetList,
    TestControl,
    MidiLog,
  },
})
</script>

<style scoped>
main {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--spacer);
}
</style>
