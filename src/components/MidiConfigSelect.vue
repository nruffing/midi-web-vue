<template>
  <!--https://open-ui.org/components/selectlist/-->
  <select>
    <option
      v-for="config in sorted"
      :value="config"
    >
      {{ config.shortName }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useConfigStore } from '@/stores/configStore'
import { controllableSort, type Controllable } from '@/config/controllable'

export default defineComponent({
  name: 'MidiConfigSelect',
  computed: {
    ...mapStores(useConfigStore),
    sorted(): Controllable[] {
      const toSort = [...this.configStore.configs]
      return toSort.sort(controllableSort)
    },
  },
})
</script>

<style scoped></style>
