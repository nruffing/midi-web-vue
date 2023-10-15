import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'

export const Md500Config = {
  ...DefaultConfig,
  name: 'Boss MD-500',
  shortName: 'MD-500',
  specUrl: 'https://static.roland.com/assets/media/pdf/MD-500_MIDI_Imple_eng01_W.pdf',

  controlChangeCommandGroups: [
    // TODO
  ],
} as Controllable
