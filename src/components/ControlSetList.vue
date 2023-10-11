<template>
  <main>
    <button @click="addControlSet">Add</button>
    <ControlSet
      v-for="controlSet in controlSets"
      :model-value="controlSet"
      :key="controlSet.id"
      @update:model-value="saveControlSets"
    />
  </main>
</template>

<script lang="ts">
import ControlSet, { type ControlSetState } from '@/components/ControlSet.vue'
import { defineComponent } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { LocalStorageKeys, saveToLocalStorage, getLocalStorageValue } from '@/storage'

interface Data {
  controlSets: ControlSetState[]
}

export default defineComponent({
  name: 'ControlSetList',
  components: {
    ControlSet,
  },
  data(): Data {
    return {
      controlSets: [],
    }
  },
  mounted() {
    this.controlSets = getLocalStorageValue<ControlSetState[]>(LocalStorageKeys.controlSets) ?? []
    if (!this.controlSets.length) {
      this.addControlSet()
    }
  },
  methods: {
    addControlSet() {
      this.controlSets.push({
        id: uuidv4(),
      } as ControlSetState)
    },
    saveControlSets(updatedState: ControlSetState) {
      const sets = [...this.controlSets]
      for (var set of sets) {
        if (set.id === updatedState.id) {
          Object.assign(set, updatedState)
          break
        }
      }
      saveToLocalStorage(LocalStorageKeys.controlSets, sets)
    },
  },
})
</script>

<style scoped></style>
