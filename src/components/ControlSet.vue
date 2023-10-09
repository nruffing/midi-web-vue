<template>
  <div class="control-set">
    <SelectInput
      v-model="selectedOutput"
      :items="devicesStore.outputs"
      display-property="name"
    />
    <SelectInput
      v-model="selectedConfig"
      :items="configStore.configs"
      display-property="shortName"
      :sort-function="controllableSort"
      @update:model-value="onConfigSelected"
    />
    <SelectInput
      v-model="selectedChannel"
      :items="channels"
      display-property="name"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from '@/stores/devicesStore'
import { useConfigStore } from '@/stores/configStore'
import SelectInput from './SelectInput.vue'
import { controllableSort, type Controllable } from '@/config/controllable'
import { channels, MidiChannel, type MidiChannelOption } from '@/midi/midiChannel'

interface Data {
  selectedOutput: MIDIOutput | undefined
  selectedConfig: Controllable | undefined
  selectedChannel: MidiChannelOption | undefined
}

export default defineComponent({
  name: 'ControlSet',
  components: {
    SelectInput,
  },
  data(): Data {
    return {
      selectedOutput: undefined,
      selectedConfig: undefined,
      selectedChannel: undefined,
    }
  },
  computed: {
    ...mapStores(useDevicesStore, useConfigStore),
    controllableSort: () => controllableSort,
    channels: () => channels,
  },
  mounted() {
    if (this.devicesStore.outputs?.length) {
      this.selectedOutput = this.devicesStore.outputs[0]
    }
    if (this.configStore.configs?.length) {
      this.selectedConfig = this.configStore.configs[0]
    }
    this.onConfigSelected()
  },
  methods: {
    onConfigSelected() {
      if (!this.selectedConfig) {
        return
      }
      this.selectChannel(this.selectedConfig.defaultChannel)
    },
    selectChannel(channel: MidiChannel | number) {
      this.selectedChannel = this.channels.find(c => c.value === channel)
    },
  },
})
</script>

<style scoped></style>
