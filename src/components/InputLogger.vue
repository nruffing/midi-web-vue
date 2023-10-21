<template>
  <div class="input-logger">
    <SelectInput
      v-model="selectedInput"
      :items="devicesStore.inputs"
      display-property="name"
      @update:model-value="updateModelValue"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapStores } from 'pinia'
import { useDevicesStore } from '@/stores/devicesStore'
import SelectInput from './SelectInput.vue'

interface Data {
  selectedInput: MIDIInput | undefined
  listeningInput: MIDIInput | undefined
}

export default defineComponent({
  name: 'InputLogger',
  components: {
    SelectInput,
  },
  data(): Data {
    return {
      selectedInput: undefined,
      listeningInput: undefined,
    }
  },
  computed: {
    ...mapStores(useDevicesStore),
  },
  methods: {
    updateModelValue() {
      if (this.listeningInput) {
        this.listeningInput.onmidimessage = null
      }
      this.listeningInput = this.selectedInput
      if (this.listeningInput) {
        this.listeningInput.onmidimessage = this.onMidiMessage
      }
    },
    onMidiMessage(event: Event) {
      console.log(event)
    },
  },
})
</script>

<style scoped>
.input-logger {
  display: flex;
  flex-direction: row;
  gap: var(--spacer);
  padding: var(--spacer);
}
</style>
