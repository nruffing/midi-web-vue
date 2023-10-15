<template>
  <main>
    <header>
      <button @click="addControlSet">Add</button>
      <span class="flex-spacer" />
      <button 
        class="debug-button"
        @click="showDebug = !showDebug"
      >
        {{ showDebug ? 'Hide Debug' : 'Show Debug' }}
      </button>
    </header>
    <ControlSetList ref="setList" />
    <TestControl v-if="showDebug" />
    <MidiLog v-if="showDebug" />
  </main>
</template>

<script lang="ts">
import ControlSetList from '@/components/ControlSetList.vue'
import TestControl from '@/components/TestControl.vue'
import MidiLog from '@/components/MidiLog.vue'
import { defineComponent } from 'vue'

interface Data {
  showDebug: boolean,
}

export default defineComponent({
  name: 'HomeView',
  components: {
    ControlSetList,
    TestControl,
    MidiLog,
  },
  data(): Data {
    return {
      showDebug: false,
    }
  },
  methods: {
    addControlSet() {
      const setList = this.$refs.setList as typeof ControlSetList
      setList.addControlSet()
    },
  },
})
</script>

<style scoped>
.debug-button {
  align-self: flex-end;
}
</style>
