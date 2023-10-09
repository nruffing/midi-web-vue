import type { Controllable } from '@/config/controllable'
import { DefaultConfig } from '../default'

export const Grandmeister40Config = {
  ...DefaultConfig,
  name: 'Hughes and Kettner Grandmeister Deluxe 40',
  shortName: 'Grandmeister 40',
  specUrl: 'https://hughes-and-kettner.com/wp-content/uploads/2016/09/GM_40_Deluxe_BDA_1_3.pdf',

  controlChangeCommands: [
    // TODO
  ],
} as Controllable