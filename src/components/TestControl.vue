<template>
  <div class="test-control">
    <SelectInput
      v-model="selectedOutput"
      :items="devicesStore.outputs"
      display-property="name"
      @update:model-value="updateModelValue"
    />
    <SelectInput
      v-model="selectedChannel"
      :items="midiStore.channels"
      display-property="name"
      @update:model-value="updateModelValue"
    />
    <input
      type="number"
      v-model="commandNumber"
      min="1"
      max="127"
      @change="updateModelValue"
    />
    <input
      type="number"
      v-model="value"
      min="0"
      max="127"
      @change="updateModelValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from '@/stores/devicesStore'
import { useMidiStore } from '@/stores/midiStore'
import SelectInput from './SelectInput.vue'
import type { MidiChannelOption } from '@/midi/midiChannel'
import { DefaultConfig } from '@/config/default'
import { ControlChangeCommand, ControlChangeParameter } from '@/midi/controlChange'

interface Data {
  commandNumber: number
  value: number
  selectedOutput: MIDIOutput | undefined
  selectedChannel: MidiChannelOption | undefined
}

export default defineComponent({
  name: 'TestControl',
  components: {
    SelectInput,
  },
  data(): Data {
    return {
      value: 0,
      commandNumber: 0,
      selectedOutput: undefined,
      selectedChannel: undefined,
    }
  },
  computed: {
    ...mapStores(useDevicesStore, useMidiStore),
    parameter(): ControlChangeParameter {
      const command = ControlChangeCommand.rangeCommand('test', this.commandNumber)
      const config = {
        ...DefaultConfig,
        shortName: 'Test',
      }
      return new ControlChangeParameter(config, command)
    },
  },
  methods: {
    updateModelValue() {
      if (this.selectedOutput && this.selectedChannel && this.commandNumber) {
        const log = this.parameter?.sendValue(this.selectedOutput, this.value, this.selectedChannel.value)
        this.midiStore.log(log)
      }
    },
  },
})
</script>

<style scoped>
.test-control {
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
  padding: var(--spacer);
}
</style>
