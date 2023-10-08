import { defineStore } from 'pinia'

// https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API

export interface State {
  outputs: MIDIOutput[] | undefined
  midiPermissionRequired: boolean
}

export const useDevicesStore = defineStore('devices', {
  state: (): State => ({
    outputs: undefined,
    midiPermissionRequired: false,
  }),
  actions: {
    async initialize() {
      // https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API#browser_compatibility
      const permission = await navigator.permissions.query({
        name: 'midi',
        sysex: false,
      } as unknown as PermissionDescriptor)
      const isPrompt = permission.state === 'prompt'
      if (permission.state === 'granted' || isPrompt) {
        // requesting access when state is "prompt" will prompt user for permission
        const midiAccess = await navigator.requestMIDIAccess()
        this.outputs = Array.from(midiAccess.outputs.values()) ?? []
      } else if (isPrompt) {
        this.midiPermissionRequired = true
      }
    },
  },
})
