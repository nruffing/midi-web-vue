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
    <template v-if="showDebug">
      <InputLogger />
      <TestControl />
      <MidiLog />
    </template>
  </main>
</template>

<script lang="ts">
import ControlSetList from '@/components/ControlSetList.vue'
import TestControl from '@/components/TestControl.vue'
import MidiLog from '@/components/MidiLog.vue'
import { defineComponent } from 'vue'
import InputLogger from '@/components/InputLogger.vue'

interface Data {
  showDebug: boolean
}

export default defineComponent({
  name: 'HomeView',
  components: {
    ControlSetList,
    TestControl,
    MidiLog,
    InputLogger,
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
