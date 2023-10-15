<template>
  <div>
    <ControlToggle
      v-if="isToggle"
      v-model="value"
      :on-value="command.onValue ?? 0"
      :off-value="command.offValue ?? 0"
      :label="command.name"
      @update:model-value="onValueUpdate"
    />
    <ControlValue
      v-if="isRange"
      v-model="value"
      :min-value="command.minValue ?? 0"
      :max-value="command.maxValue ?? 0"
      :label="command.name"
      @update:model-value="onValueUpdate"
    />
    <ControlSelect
      v-if="isSelect"
      v-model="value"
      :select-items="command.selectItems ?? []"
      :label="command.name"
      @update:model-value="onValueUpdate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { mapStores } from 'pinia'
import { ControlChangeCommandType, type ControlChangeCommand, ControlChangeParameter } from '@/midi/controlChange'
import type { Controllable } from '@/config/controllable'
import ControlToggle from './ControlToggle.vue'
import ControlValue from './ControlValue.vue'
import { useMidiStore } from '@/stores/midiStore'
import ControlSelect from './ControlSelect.vue'

interface Data {
  value: number
  parameter: ControlChangeParameter | undefined
}

export default defineComponent({
  name: 'Control',
  components: { ControlToggle, ControlValue, ControlSelect },
  props: {
    output: {
      type: Object as PropType<MIDIOutput>,
    },
    config: {
      type: Object as PropType<Controllable>,
      required: true,
    },
    channel: {
      type: Number,
      required: true,
    },
    command: {
      type: Object as PropType<ControlChangeCommand>,
      required: true,
    },
  },
  data(): Data {
    return {
      value: 0,
      parameter: undefined,
    }
  },
  computed: {
    ...mapStores(useMidiStore),
    isToggle(): boolean {
      return this.command.type === ControlChangeCommandType.toggle
    },
    isRange(): boolean {
      return this.command.type === ControlChangeCommandType.range
    },
    isSelect(): boolean {
      return this.command.type === ControlChangeCommandType.select
    },
  },
  mounted() {
    this.parameter = new ControlChangeParameter(this.config, this.command)
  },
  methods: {
    onValueUpdate() {
      if (this.output) {
        const log = this.parameter?.sendValue(this.output, this.value, this.channel)
        this.midiStore.log(log)
      }
    },
  },
})
</script>

<style scoped></style>
