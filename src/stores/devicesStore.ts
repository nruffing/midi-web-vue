import { defineStore } from 'pinia'

export interface State {
  outputs: MIDIOutput[] | undefined,
}

export const useDevicesStore = defineStore('devices', {
  state: (): State => ({
    outputs: undefined,
  }),
  actions: {
    async initialize() {
      const midiAccess = await navigator.requestMIDIAccess()
      this.outputs = Array.from(midiAccess.outputs.values()) ?? []
    },
  },  
})
