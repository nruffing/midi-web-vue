<template>
  <div class="control-set">
    <div class="control-set-header">
      <SelectInput
        v-model="selectedOutput"
        :items="devicesStore.outputs"
        display-property="name"
        @update:model-value="updateModelValue"
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
        @update:model-value="updateModelValue"
      />
    </div>
    <div
      v-if="selectedOutput && selectedConfig && selectedChannel"
      class="controls-container"
    >
      <Control
        v-for="command in selectedConfig?.controlChangeCommands"
        :key="modelValue.id + selectedConfig.name + command.commandNumber"
        :output="selectedOutput"
        :config="selectedConfig"
        :channel="selectedChannel.value"
        :command="command"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from '@/stores/devicesStore'
import { useConfigStore } from '@/stores/configStore'
import SelectInput from './SelectInput.vue'
import { controllableSort, type Controllable } from '@/config/controllable'
import { channels, MidiChannel, type MidiChannelOption } from '@/midi/midiChannel'
import Control from './Control.vue'

interface Data {
  selectedOutput: MIDIOutput | undefined
  selectedConfig: Controllable | undefined
  selectedChannel: MidiChannelOption | undefined
}

export interface ControlSetState {
  id: string
  outputId: string | undefined
  configName: string | undefined
  channel: number | undefined
}

export default defineComponent({
  name: 'ControlSet',
  components: {
    SelectInput,
    Control,
  },
  props: {
    modelValue: {
      type: Object as PropType<ControlSetState>,
      required: true,
    },
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
    this.loadModelValue()
  },
  methods: {
    loadModelValue() {
      this.selectOutput(this.modelValue.outputId)
      this.selectConfig(this.modelValue.configName)
      this.selectChannel(this.modelValue.channel)
      this.autoSelectDefaultChannel()
    },
    updateModelValue() {
      this.$emit('update:model-value', {
        id: this.modelValue.id,
        outputId: this.selectedOutput?.id,
        configName: this.selectedConfig?.name,
        channel: this.selectedChannel?.value,
      } as ControlSetState)
    },
    onConfigSelected() {
      this.autoSelectDefaultChannel()
      this.updateModelValue()
    },
    autoSelectDefaultChannel() {
      if (!this.selectedChannel && this.selectedConfig) {
        this.selectChannel(this.selectedConfig.defaultChannel)
      }
    },
    selectOutput(outputId: string | undefined) {
      this.selectedOutput = outputId ? this.devicesStore.outputs?.find(o => o.id === outputId) : undefined
      if (!this.selectedOutput && this.devicesStore.outputs?.length) {
        this.selectedOutput = this.devicesStore.outputs[0]
      }
    },
    selectConfig(name: string | undefined) {
      this.selectedConfig = name ? this.configStore.configs.find(c => c.name === name) : undefined
      if (!this.selectedConfig && this.configStore.configs?.length) {
        this.selectedConfig = this.configStore.configs[0]
      }
    },
    selectChannel(channel: MidiChannel | number | undefined) {
      this.selectedChannel = channel || channel === 0 ? this.channels.find(c => c.value === channel) : undefined
    },
  },
})
</script>

<style scoped>
.control-set {
  padding: var(--spacer-2x);
  display: flex;
  flex-direction: column;
  border: var(--control-set-border);
  border-radius: var(--border-radius);
}

.control-set-header {
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
  justify-content: center;
}

.controls-container {
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
}

.controls-container > * {
  flex: 1;
}
</style>
