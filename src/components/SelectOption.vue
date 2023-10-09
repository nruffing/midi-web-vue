<template>
  <option :value="value">
    {{ value }}
  </option>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SelectOption',
  props: {
    item: {
      type: [Object, String, Number],
    },
    displayProperty: {
      type: String,
    },
  },
  computed: {
    value() {
      if (this.displayProperty) {
        return (this.item as any)[this.displayProperty]
      }
      return this.item
    },
  },
})
</script>

<style scoped></style>
