<template>
  <div
    class="control-toggle"
    @click="onToggle"
  >
    <svg
      v-if="isOn"
      class="is-on"
      height="50px"
      width="50px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 298 298"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      enable-background="new 0 0 298 298"
    >
      <path
        d="m298,178.248h-59.517c-3.323-9.592-12.442-16.5-23.151-16.5s-19.828,6.908-23.151,16.5h-85.695c-3.323-9.592-12.442-16.5-23.151-16.5s-19.828,6.908-23.151,16.5h-60.184v16h60.183c3.323,9.592 12.442,16.5 23.151,16.5s19.828-6.908 23.151-16.5h85.695c3.323,9.592 12.442,16.5 23.151,16.5s19.828-6.908 23.151-16.5h59.518v-16zm-74.168,8c0,4.686-3.814,8.5-8.5,8.5-4.687,0-8.5-3.814-8.5-8.5s3.813-8.5 8.5-8.5c4.686,0 8.5,3.814 8.5,8.5zm-131.998,0c0,4.686-3.814,8.5-8.5,8.5-4.687,0-8.5-3.814-8.5-8.5s3.813-8.5 8.5-8.5c4.686,0 8.5,3.814 8.5,8.5z"
      ></path>
    </svg>
    <svg
      v-if="!isOn"
      class="is-off"
      height="50px"
      width="50px"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 298 298"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      enable-background="new 0 0 298 298"
    >
      <path
        d="m298,178.248h-59.517c-3.323-9.592-12.442-16.5-23.151-16.5-13.51,0-24.5,10.99-24.5,24.5 0,13.51 10.99,24.5 24.5,24.5 10.709,0 19.828-6.908 23.151-16.5h59.517v-16zm-74.168,8c0,4.687-3.814,8.5-8.5,8.5-4.687,0-8.5-3.813-8.5-8.5 0-4.686 3.813-8.5 8.5-8.5 4.686,0 8.5,3.813 8.5,8.5z"
      ></path>
      <path
        d="m171.014,87.252l-76.967,76.967c-3.238-1.582-6.873-2.472-10.713-2.472-10.709,0-19.828,6.908-23.151,16.5h-60.183v16h60.183c3.323,9.592 12.442,16.5 23.151,16.5 13.51,0 24.5-10.99 24.5-24.5 0-3.841-0.891-7.476-2.472-10.715l76.966-76.966-11.314-11.314zm-96.18,98.996c0-4.686 3.813-8.5 8.5-8.5s8.5,3.814 8.5,8.5c0,4.687-3.813,8.5-8.5,8.5s-8.5-3.814-8.5-8.5z"
      ></path>
    </svg>
    <span class="control-toggle-label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Data {
  isOn: boolean
}

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
  data(): Data {
    return {
      isOn: this.modelValue === this.onValue,
    }
  },
  methods: {
    onToggle() {
      this.isOn = !this.isOn
      this.$emit('update:model-value', this.isOn ? this.onValue : this.offValue)
    },
  },
})
</script>

<style scoped>
.control-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  fill: var();
  cursor: pointer;
  user-select: none;
}

.is-off {
  fill: var(--control-toggle-off-color);
}

.is-on {
  fill: var(--control-toggle-on-color);
}
</style>
