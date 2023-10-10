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
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { ControlChangeCommandType, type ControlChangeCommand, ControlChangeParameter } from '@/midi/controlChange'
import type { Controllable } from '@/config/controllable'
import ControlToggle from './ControlToggle.vue'

interface Data {
  value: number
  parameter: ControlChangeParameter | undefined
}

export default defineComponent({
  name: 'Control',
  components: { ControlToggle },
  props: {
    output: {
      type: Object as PropType<MIDIOutput>,
      required: true,
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
    isToggle(): boolean {
      return this.command.type === ControlChangeCommandType.toggle
    },
  },
  mounted() {
    this.parameter = new ControlChangeParameter(this.config, this.command, this.value)
  },
  methods: {
    onValueUpdate() {
      this.parameter?.sendValue(this.output, this.value, this.channel)
    },
  },
})
</script>

<style scoped></style>
