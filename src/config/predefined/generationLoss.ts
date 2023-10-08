import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'

export const GenerationLossConfig = {
  ...DefaultConfig,
  name: 'Chass Bliss Generation Loss MKII',
  shortName: 'Generation Loss',
  specUrl:
    'https://static1.squarespace.com/static/622176a9b8d15d57ffbf5700/t/63385713c84bf611e7eb673c/1664636692416/Generation+Loss+MKII_MIDI+Manual_Pedal_Chase+Bliss.pdf',

  controlChangeCommands: [
    // TODO
  ],

  minPatch: 0,
  maxPatch: 121,
} as Controllable
