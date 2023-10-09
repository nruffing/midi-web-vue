<template>
  <!--https://open-ui.org/components/selectlist/-->
  <select
    :value="rawValue"
    @change="onSelected"
  >
    <SelectOption
      v-for="item in sorted"
      :item="item"
      :display-property="displayProperty"
    />
  </select>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import SelectOption from './SelectOption.vue'

export default defineComponent({
  name: 'SelectInput',
  components: { SelectOption },
  props: {
    modelValue: {
      type: [Object, String, Number],
    },
    items: {
      type: Array,
      default: [],
    },
    displayProperty: {
      type: String,
    },
    sortFunction: {
      type: Function as PropType<(a: any, b: any) => number>,
    },
  },
  computed: {
    sorted(): any[] {
      if (!this.sortFunction) {
        return this.items
      }
      const toSort = [...this.items]
      return toSort.sort(this.sortFunction)
    },
    rawValue() {
      if (this.modelValue && this.displayProperty) {
        return (this.modelValue as any)[this.displayProperty]
      }
      return this.modelValue ?? ''
    },
  },
  methods: {
    onSelected(event: Event) {
      const changeEvent = event as InputEvent
      const selectTarget = changeEvent?.target as HTMLSelectElement
      const rawValue = selectTarget?.value
      let value = undefined

      value = this.items.find((i: any) => {
        if (this.displayProperty) {
          return i[this.displayProperty] == rawValue
        }
        return i == rawValue
      })

      this.$emit('update:model-value', value)
    },
  },
})
</script>

<style scoped></style>
