import type { Controllable } from '@/config/controllable'
import type { ControlChangeCommand } from '@/midi/controlChange'
import { MidiChannel } from '@/midi/midiChannel'

export const DefaultConfig = {
  defaultChannel: MidiChannel._01,

  //https://learn.sparkfun.com/tutorials/midi-tutorial/all#messages
  controlChangeCommand: 0xb,
  patchChangeCommand: 0xc,

  patchBankCommand: undefined,
  controlChangeCommands: [] as ControlChangeCommand[],

  minPatch: 0,
  maxPatch: 127,
} as Controllable
