<template>
  <div>
    <label>
      <input
        ref="input"
        type="checkbox"
        @input="onToggle"
      />
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ControlToggle',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    onValue: {
      type: Number,
      required: true,
    },
    offValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    onToggle() {
      const input = this.$refs.input as HTMLInputElement
      this.$emit('update:model-value', input.checked ? this.onValue : this.offValue)
    },
  },
})
</script>

<style scoped></style>
