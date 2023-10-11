import { defineStore } from 'pinia'
import type { Controllable } from '@/config/controllable'
import { Grandmeister40Config } from '@/config/predefined/hk40'
import { TonexConfig } from '@/config/predefined/tonex'
import { GenerationLossConfig } from '@/config/predefined/generationLoss'
import { Md500Config } from '@/config/predefined/md500'

export interface State {
  configs: Controllable[]
}

export const useConfigStore = defineStore('config', {
  state: (): State => ({
    configs: [TonexConfig, Grandmeister40Config /*, GenerationLossConfig, Md500Config*/],
  }),
})
