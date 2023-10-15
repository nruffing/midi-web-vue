import type { Controllable } from '@/config/controllable'
import { validateByte } from './byteUtilities'
import type { MidiChannel } from './midiChannel'

export class ControlChangeCommand {
  name: string
  type: ControlChangeCommandType
  commandNumber: number
  minValue: number | undefined
  maxValue: number | undefined
  offValue: number | undefined
  onValue: number | undefined
  selectItems: ControlChangeSelectItem[] | undefined

  private constructor(
    name: string,
    type: ControlChangeCommandType,
    commandNumber: number,
    minValue: number | undefined,
    maxValue: number | undefined,
    offValue: number | undefined,
    onValue: number | undefined,
    selectItems: ControlChangeSelectItem[] | undefined
  ) {
    validateByte(commandNumber, 'commandNumber')
    validateByte(minValue, 'minValue')
    validateByte(maxValue, 'maxValue')
    validateByte(offValue, 'offValue')
    validateByte(onValue, 'onValue')

    for (const selectItem of selectItems ?? []) {
      validateByte(selectItem.value, selectItem.name)
    }

    this.name = name
    this.type = type
    this.commandNumber = commandNumber
    this.minValue = minValue
    this.maxValue = maxValue
    this.offValue = offValue
    this.onValue = onValue
    this.selectItems = selectItems
  }

  static rangeCommand(name: string, commandNumber: number, minValue: number = 0, maxValue: number = 127) {
    return new ControlChangeCommand(name, ControlChangeCommandType.range, commandNumber, minValue, maxValue, undefined, undefined, undefined)
  }

  static toggleCommand(name: string, commandNumber: number, offValue: number = 0, onValue: number = 127) {
    return new ControlChangeCommand(name, ControlChangeCommandType.toggle, commandNumber, undefined, undefined, offValue, onValue, undefined)
  }

  static selectCommand(name: string, commandNumber: number, selectItems: ControlChangeSelectItem[]) {
    return new ControlChangeCommand(name, ControlChangeCommandType.select, commandNumber, undefined, undefined, undefined, undefined, selectItems)
  }
}

export interface ControlChangeSelectItem {
  name: string,
  value: number,
}

export enum ControlChangeCommandType {
  range = 0,
  toggle = 1,
  select = 2,
}

export class ControlChangeParameter {
  config: Controllable
  command: ControlChangeCommand
  value: number

  constructor(config: Controllable, command: ControlChangeCommand, value: number = 0) {
    this.config = config
    this.command = command
    this.value = value
  }

  sendValue(output: MIDIOutput, value: number | undefined, channel: MidiChannel): MidiCommandLog {
    validateByte(value, this.command.name)
    this.value = value ?? 0

    const commandStatusByte = (this.config.controlChangeCommand << 4) + channel
    const bytes = [commandStatusByte, this.command.commandNumber, this.value]
    output.send(bytes)

    return {
      value,
      channel,
      controlChangeCommand: this.config.controlChangeCommand,
      bytes,
      output: output.name ?? '',
      config: this.config.shortName,
      timestamp: new Date(),
    }
  }
}

export interface MidiCommandLog {
  value: number | undefined
  channel: MidiChannel
  controlChangeCommand: number
  bytes: number[]
  output: string
  config: string
  timestamp: Date
}
