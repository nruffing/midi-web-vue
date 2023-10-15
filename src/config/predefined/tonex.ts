import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'
import { ControlChangeCommand, ControlChangeCommandGroup } from '@/midi/controlChange'

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

  controlChangeCommandGroups: [
    new ControlChangeCommandGroup('Model', 2, [ControlChangeCommand.rangeCommand('Volume', 103), ControlChangeCommand.rangeCommand('Gain', 102)]),

    new ControlChangeCommandGroup('Reverb', 2, [
      ControlChangeCommand.toggleCommand('On/Off', 75),
      ControlChangeCommand.selectCommand('Reverb Type', 85, [
        { name: 'Spring 1', value: 1 },
        { name: 'Spring 2', value: 26 },
        { name: 'Spring 3', value: 52 },
        { name: 'Room', value: 80 },
        { name: 'Plate', value: 112 },
      ]),
      ControlChangeCommand.rangeCommand('Reverb Time', 76),
      ControlChangeCommand.rangeCommand('Reverb Pre Delay', 77),
      ControlChangeCommand.rangeCommand('Reverb Color', 78),
      ControlChangeCommand.rangeCommand('Reverb Mix', 79),
    ]),

    new ControlChangeCommandGroup('Noise Gate', 2, [
      ControlChangeCommand.toggleCommand('On/Off', 14),
      ControlChangeCommand.toggleCommand('Threshold', 15),
      ControlChangeCommand.rangeCommand('Release', 16),
      ControlChangeCommand.rangeCommand('Depth', 17),
    ]),

    new ControlChangeCommandGroup('Compressor', 2, [
      ControlChangeCommand.toggleCommand('On/Off', 18),
      ControlChangeCommand.rangeCommand('Post/Pre', 22),
      ControlChangeCommand.toggleCommand('Threshold', 19),
      ControlChangeCommand.rangeCommand('Gain', 20),
      ControlChangeCommand.rangeCommand('Attack', 21),
    ]),

    new ControlChangeCommandGroup('Advanced Parameters', 2, [
      ControlChangeCommand.toggleCommand('Post/Pre', 30),
      ControlChangeCommand.rangeCommand('Bass', 23),
      ControlChangeCommand.rangeCommand('Bass Freq', 24),
      ControlChangeCommand.rangeCommand('Mid', 25),
      ControlChangeCommand.rangeCommand('Mid Q', 26),
      ControlChangeCommand.rangeCommand('Mid Freq', 27),
      ControlChangeCommand.rangeCommand('Treble', 28),
      ControlChangeCommand.rangeCommand('Treble Freq', 29),
      ControlChangeCommand.rangeCommand('Presence', 106),
      ControlChangeCommand.rangeCommand('Depth', 107),
      ControlChangeCommand.rangeCommand('Mix', 104),
    ]),

    new ControlChangeCommandGroup('Mics', 2, [
      ControlChangeCommand.rangeCommand('Resonance', 108),
      ControlChangeCommand.selectCommand('Mic 1', 109, [
        { name: 'Condenser 414', value: 1 },
        { name: 'Dynamic 57', value: 44 },
        { name: 'Ribbon 121', value: 100 },
      ]),
      ControlChangeCommand.rangeCommand('Mic 1 X', 110),
      ControlChangeCommand.rangeCommand('Mic 1 Z', 111),
      ControlChangeCommand.selectCommand('Mic 2', 112, [
        { name: 'Condenser 414', value: 1 },
        { name: 'Dynamic 57', value: 44 },
        { name: 'Ribbon 121', value: 100 },
      ]),
      ControlChangeCommand.rangeCommand('Mic 2 X', 113),
      ControlChangeCommand.rangeCommand('Mic 2 Z', 114),
      ControlChangeCommand.rangeCommand('Mics Mix', 115),
    ]),

    new ControlChangeCommandGroup('', 1, [ControlChangeCommand.toggleCommand('Preset', 12)]),

    new ControlChangeCommandGroup('', 1, [ControlChangeCommand.toggleCommand('Amp', 105)]),

    new ControlChangeCommandGroup('', 1, [ControlChangeCommand.rangeCommand('Expression Pedal', 11)]),
  ],

  /*
  PRESETs are arranged in a grid of 50 numbered banks (00-49) with 3 PRESETs each (A, B and C)
  for a total of 150 PRESETs.
  */
  minPatch: 0,
  maxPatch: 149,
} as Controllable
