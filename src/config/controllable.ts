import type { ControlChangeCommand, ControlChangeCommandGroup } from '@/midi/controlChange'
import type { MidiChannel } from '@/midi/midiChannel'

export interface Controllable {
  name: string
  shortName: string
  specUrl: string

  defaultChannel: MidiChannel

  controlChangeCommand: number
  patchChangeCommand: number

  patchBankCommand: ControlChangeCommand | undefined
  controlChangeCommandGroups: ControlChangeCommandGroup[]

  minPatch: number
  maxPatch: number
}

export function controllableSort(a: Controllable, b: Controllable) {
  return a.shortName.localeCompare(b.shortName)
}
