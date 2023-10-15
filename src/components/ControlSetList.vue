<template>
  <div class="control-set-list">
    <ControlSet
      v-for="controlSet in controlSets"
      :model-value="controlSet"
      :key="controlSet.id"
      @update:model-value="saveControlSets"
      @delete="deleteControlSet(controlSet)"
    />
  </div>
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
      this.saveControlSets(undefined)
    },
    deleteControlSet(deletedSet: ControlSetState) {
      this.controlSets = this.controlSets.filter(c => c.id !== deletedSet.id)
      this.saveControlSets(undefined)
    },
    saveControlSets(updatedState: ControlSetState | undefined) {
      const sets = [...this.controlSets]
      if (updatedState) {
        for (var set of sets) {
          if (set.id === updatedState.id) {
            Object.assign(set, updatedState)
            break
          }
        }
      }
      saveToLocalStorage(LocalStorageKeys.controlSets, sets)
    },
  },
})
</script>

<style scoped>
.control-set-list {
  padding: var(--spacer-2x);
  display: flex;
  flex-direction: column;
  gap: var(--spacer-2x);
}
</style>
