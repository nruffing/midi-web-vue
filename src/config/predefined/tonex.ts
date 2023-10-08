import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'
import { ControlChangeCommand } from '@/midi/controlChange'

export const TonexConfig = {
  ...DefaultConfig,
  name: 'ToneX',
  shortName: 'ToneX',
  specUrl: 'https://www.cavallimusica.com/media/productattach/t/o/tonex_pedal_user_manual.pdf',

  /*
  If you plan to use PRESETs above the 127th, you should send a standard MIDI Bank Change message
  (MIDI CC# 0) with a value equal to the MIDI Bank you’d like to use before each MIDI Program Change.
  */
  patchBankCommand: ControlChangeCommand.rangeCommand('MIDI Patch Bank', 0x00, 0, 1),

  controlChangeCommands: [
    ControlChangeCommand.toggleCommand('Preset', 12),
    ControlChangeCommand.rangeCommand('Expression Pedal', 11),
    ControlChangeCommand.rangeCommand('Gain', 102),
    ControlChangeCommand.rangeCommand('Bass', 23),
    ControlChangeCommand.rangeCommand('Mid', 24),
    ControlChangeCommand.rangeCommand('Treble', 25),
    ControlChangeCommand.toggleCommand('Reverb', 79),
    ControlChangeCommand.toggleCommand('Compressor', 19),
    ControlChangeCommand.toggleCommand('Noise Gate', 15),
    ControlChangeCommand.rangeCommand('Model Volume', 103),
    // TODO
  ],

  /*
  PRESETs are arranged in a grid of 50 numbered banks (00-49) with 3 PRESETs each (A, B and C)
  for a total of 150 PRESETs.
  */
  minPatch: 0,
  maxPatch: 149,
} as Controllable
