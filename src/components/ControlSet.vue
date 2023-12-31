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
        :items="midiStore.channels"
        display-property="name"
        @update:model-value="updateModelValue"
      />
      <div class="flex-spacer"></div>
      <Icon
        name="delete"
        @click="$emit('delete')"
      />
    </div>
    <div
      v-if="selectedConfig && selectedChannel"
      class="controls-container"
    >
      <div
        v-for="group in selectedConfig.controlChangeCommandGroups"
        class="control-group"
        :class="{
          'no-label': !group.name,
        }"
        :style="{
          gridTemplateRows: `repeat(${group.rows + 1}, auto)`,
          gridTemplateColumns: `repeat(${group.columns}, auto)`,
        }"
      >
        <Control
          v-for="command in group.commands"
          :key="modelValue.id + selectedConfig.name + command.commandNumber"
          :output="selectedOutput"
          :config="selectedConfig"
          :channel="selectedChannel.value"
          :command="command"
          :model-value="controlStateMap.get(command.name)"
          @update:model-value="onControlUpdated"
        />
        <span
          class="control-group-label"
          :style="{
            gridColumnEnd: `span ${group.columns}`,
          }"
        >
          {{ group.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from '@/stores/devicesStore'
import { useConfigStore } from '@/stores/configStore'
import { useMidiStore } from '@/stores/midiStore'
import SelectInput from './SelectInput.vue'
import { controllableSort, type Controllable } from '@/config/controllable'
import { MidiChannel, type MidiChannelOption } from '@/midi/midiChannel'
import Control, { type ControlState } from './Control.vue'
import Icon from './Icon.vue'

interface Data {
  selectedOutput: MIDIOutput | undefined
  selectedConfig: Controllable | undefined
  selectedChannel: MidiChannelOption | undefined
  controlStateMap: Map<string, ControlState>
}

export interface ControlSetState {
  id: string
  outputId: string | undefined
  configName: string | undefined
  channel: number | undefined
  controls: ControlState[]
}

export default defineComponent({
  name: 'ControlSet',
  components: {
    SelectInput,
    Control,
    Icon,
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
      controlStateMap: new Map<string, ControlState>(),
    }
  },
  computed: {
    ...mapStores(useDevicesStore, useConfigStore, useMidiStore),
    controllableSort: () => controllableSort,
  },
  mounted() {
    this.loadModelValue()
    this.loadGroupState()
  },
  methods: {
    loadGroupState() {
      this.controlStateMap = new Map<string, ControlState>()
      if (!this.selectedConfig) {
        return
      }
      for (const group of this.selectedConfig.controlChangeCommandGroups) {
        for (const command of group.commands) {
          this.controlStateMap.set(command.name, { name: command.name, value: 0 })
        }
      }
      this.loadControlState()
    },
    loadControlState() {
      for (const controlState of this.modelValue.controls ?? []) {
        const state = this.controlStateMap.get(controlState.name)
        if (state) {
          Object.assign(state, controlState)
        }
      }
    },
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
        controls: Array.from(this.controlStateMap.values()),
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
    },
    selectChannel(channel: MidiChannel | number | undefined) {
      this.selectedChannel = channel || channel === 0 ? this.midiStore.channels.find(c => c.value === channel) : undefined
    },
    onControlUpdated(controlState: ControlState) {
      const state = this.controlStateMap.get(controlState.name)
      if (state) {
        Object.assign(state, controlState)
        this.updateModelValue()
      }
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
  gap: var(--spacer);
  background: var(--control-set-background);
}

.control-set-header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacer);
  justify-content: center;
}

.controls-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacer-3x);
  justify-content: center;
}

.control-group {
  display: grid;
  gap: var(--spacer-3x);
  border: var(--control-group-border);
  border-radius: var(--border-radius);
  padding: var(--spacer);
}

.control-group.no-label {
  border: none;
}

.control-group-label {
  color: var(--control-group-label-color);
  text-align: center;
  font-weight: 500;
}
</style>
