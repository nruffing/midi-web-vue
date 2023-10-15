<template>
  <div class="control control-select">
    <div class="control-container control-select-items">
      <span
        class="control-select-item"
        :class="{ selected: selected === selectItem }"
        v-for="selectItem of selectItems"
        :key="selectItem.name"
        @click="onSelect(selectItem)"
      >
        {{ selectItem.name }}
      </span>
    </div>
    <span class="control-label">{{ label }}</span>
  </div>
</template>

<script lang="ts">
import type { ControlChangeSelectItem } from '@/midi/controlChange'
import { defineComponent, type PropType } from 'vue'

interface Data {
  selected: ControlChangeSelectItem | undefined
}

export default defineComponent({
  name: 'ControlSelect',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    selectItems: {
      type: Array as PropType<ControlChangeSelectItem[]>,
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
      selected: undefined,
    }
  },
  mounted() {
    this.updateState()
  },
  watch: {
    modelValue() {
      this.updateState()
    },
  },
  methods: {
    updateState() {
      this.selected = this.selectItems.find(i => i.value === this.modelValue)
    },
    onSelect(selectItem: ControlChangeSelectItem) {
      this.selected = selectItem
      this.$emit('update:model-value', selectItem.value)
    },
  },
})
</script>

<style scoped>
.control-select {
  align-items: center;
}

.control-select-items {
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--control-select-unselected-color);
}

.control-select-item.selected {
  color: var(--control-select-selected-color);
}
</style>
