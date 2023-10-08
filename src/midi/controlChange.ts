import { validateByte } from './byteUtilities'

export class ControlChangeCommand {
  name: string
  type: ControlChangeCommandType
  commandNumber: number
  minValue: number | undefined
  maxValue: number | undefined
  offValue: number | undefined
  onValue: number | undefined

  private constructor(
    name: string,
    type: ControlChangeCommandType,
    commandNumber: number,
    minValue: number | undefined,
    maxValue: number | undefined,
    offValue: number | undefined,
    onValue: number | undefined,
  ) {
    validateByte(commandNumber, 'commandNumber')
    validateByte(minValue, 'minValue')
    validateByte(maxValue, 'maxValue')
    validateByte(offValue, 'offValue')
    validateByte(onValue, 'onValue')

    this.name = name
    this.type = type
    this.commandNumber = commandNumber
    this.minValue = minValue
    this.maxValue = maxValue
    this.offValue = offValue
    this.onValue = onValue
  }

  static rangeCommand(name: string, commandNumber: number, minValue: number = 0, maxValue: number = 127) {
    return new ControlChangeCommand(name, ControlChangeCommandType.range, commandNumber, minValue, maxValue, undefined, undefined)
  }

  static toggleCommand(name: string, commandNumber: number, offValue: number = 0, onValue: number = 127) {
    return new ControlChangeCommand(name, ControlChangeCommandType.range, commandNumber, undefined, undefined, offValue, onValue)
  }
}

export enum ControlChangeCommandType {
  range = 0,
  toggle = 1,
}
