import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'
import { ControlChangeCommand, ControlChangeCommandGroup } from '@/midi/controlChange'

export const Grandmeister40Config = {
  ...DefaultConfig,
  name: 'Hughes and Kettner Grandmeister Deluxe 40',
  shortName: 'Grandmeister 40',
  specUrl: 'https://hughes-and-kettner.com/wp-content/uploads/2016/09/GM_40_Deluxe_BDA_1_3.pdf',

  controlChangeCommandGroups: [
    new ControlChangeCommandGroup('Preamp', 2, [
      ControlChangeCommand.toggleCommand('Boost', 64),
      ControlChangeCommand.rangeCommand('Bass', 21),
      ControlChangeCommand.rangeCommand('Mid', 22),
      ControlChangeCommand.rangeCommand('Treble', 23),
    ]),

    new ControlChangeCommandGroup('Power Amp', 2, [
      ControlChangeCommand.selectCommand('Channel', 31, [
        { name: 'Clean', value: 0 },
        { name: 'Crunch', value: 33 },
        { name: 'Lead', value: 65 },
        { name: 'Ultra', value: 96 },
      ]),
      ControlChangeCommand.rangeCommand('Volume (soft)', 7),
      ControlChangeCommand.rangeCommand('Volume (hard)', 57),
      ControlChangeCommand.toggleCommand('Mute', 9),
      ControlChangeCommand.rangeCommand('Gain (soft)', 20),
      ControlChangeCommand.rangeCommand('Gain (hard)', 56),
      ControlChangeCommand.rangeCommand('Resonance', 24),
      ControlChangeCommand.rangeCommand('Presence', 25),
    ]),

    new ControlChangeCommandGroup('Modulation', 2, [
      ControlChangeCommand.toggleCommand('On/Off', 52),
      ControlChangeCommand.selectCommand('Type', 12, [
        { name: 'Chorus', value: 1 },
        { name: 'Flanger', value: 33 },
        { name: 'Phaser', value: 65 },
        { name: 'Tremolo', value: 97 },
      ]),
      ControlChangeCommand.rangeCommand('Intensity', 1),
      ControlChangeCommand.rangeCommand('Speed', 26),
    ]),

    new ControlChangeCommandGroup('', 1, [
      ControlChangeCommand.selectCommand('Power Soak', 30, [
        { name: 'Speaker Off', value: 0 },
        { name: '1W', value: 25 },
        { name: '5W', value: 50 },
        { name: '20W', value: 75 },
        { name: 'Soak Off (40W)', value: 100 },
      ]),
    ]),

    new ControlChangeCommandGroup('Delay', 1, [
      ControlChangeCommand.toggleCommand('On/Off', 53),
      ControlChangeCommand.rangeCommand('Feedback', 27),
      ControlChangeCommand.rangeCommand('Volume', 28),
    ]),

    new ControlChangeCommandGroup('Reverb', 1, [ControlChangeCommand.toggleCommand('On/Off', 54), ControlChangeCommand.rangeCommand('Volume', 29)]),

    new ControlChangeCommandGroup('', 1, [ControlChangeCommand.toggleCommand('FX Loop', 55)]),

    new ControlChangeCommandGroup('', 1, [ControlChangeCommand.toggleCommand('Noise Gate', 63)]),
  ],
} as Controllable
