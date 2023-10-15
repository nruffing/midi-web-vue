import { defineStore } from 'pinia'
import type { MidiCommandLog } from '@/midi/controlChange'
import { channels, type MidiChannelOption } from '@/midi/midiChannel'

export interface State {
  commandHistory: MidiCommandLog[],
  channels: MidiChannelOption[],
}

export const useMidiStore = defineStore('midi', {
  state: (): State => ({
    commandHistory: [] as MidiCommandLog[],
    channels: channels,
  }),
  actions: {
    log(command: MidiCommandLog | undefined) {
      if (command) {
        this.commandHistory.unshift(command)
      }
    },
  },
})
