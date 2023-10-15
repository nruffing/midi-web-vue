import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'
import { ControlChangeCommand } from '@/midi/controlChange'

export const Grandmeister40Config = {
  ...DefaultConfig,
  name: 'Hughes and Kettner Grandmeister Deluxe 40',
  shortName: 'Grandmeister 40',
  specUrl: 'https://hughes-and-kettner.com/wp-content/uploads/2016/09/GM_40_Deluxe_BDA_1_3.pdf',

  controlChangeCommands: [
    ControlChangeCommand.toggleCommand('Mute', 9),

    // Channel
    ControlChangeCommand.rangeCommand('Channel', 31), // TODO - multi select commands
    ControlChangeCommand.rangeCommand('Volume (soft)', 7),
    ControlChangeCommand.rangeCommand('Volume (hard)', 57),
    ControlChangeCommand.rangeCommand('Gain (soft)', 20),
    ControlChangeCommand.rangeCommand('Gain (hard)', 56),
    ControlChangeCommand.toggleCommand('Boost', 64),

    // Power Amp EQ
    ControlChangeCommand.rangeCommand('Resonance', 24),
    ControlChangeCommand.rangeCommand('Presence', 25),

    // Power Soak
    // ControlChangeCommand.rangeCommand('Power Soak', 30), // TODO - multi select commands

    // Preamp EQ
    ControlChangeCommand.rangeCommand('Bass', 21),
    ControlChangeCommand.rangeCommand('Mid', 22),
    ControlChangeCommand.rangeCommand('Treble', 23),

    // Modulation FX
    ControlChangeCommand.toggleCommand('Mod-FX', 52),
    ControlChangeCommand.rangeCommand('Mod-FX Type', 12), // TODO - multi select commands
    ControlChangeCommand.rangeCommand('Modulation Intensity', 1),
    ControlChangeCommand.rangeCommand('Mod Speed', 26),

    // Delay FX
    ControlChangeCommand.toggleCommand('Delay', 53),
    ControlChangeCommand.rangeCommand('Delay Feedback', 27),
    ControlChangeCommand.rangeCommand('Delay Volume', 28),

    // Reverb FX
    ControlChangeCommand.toggleCommand('Reverb', 54),
    ControlChangeCommand.rangeCommand('Reverb Volume', 29),

    // FX Loop
    ControlChangeCommand.toggleCommand('FX Loop', 55),

    // Noise Gate
    ControlChangeCommand.toggleCommand('Noise Gate', 63),
  ],
} as Controllable
