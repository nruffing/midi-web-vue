import { defineStore } from 'pinia'
import type { MidiCommandLog } from '@/midi/controlChange'

export interface State {
  commandHistory: MidiCommandLog[]
}

export const useMidiStore = defineStore('midi', {
  state: (): State => ({
    commandHistory: [] as MidiCommandLog[],
  }),
  actions: {
    log(command: MidiCommandLog | undefined) {
      if (command) {
        this.commandHistory.unshift(command)
      }
    },
  },
})
