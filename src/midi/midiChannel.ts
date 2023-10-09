export enum MidiChannel {
  _01 = 0,
  _02 = 1,
  _03 = 2,
  _04 = 3,
  _05 = 4,
  _06 = 5,
  _07 = 6,
  _08 = 7,
  _09 = 8,
  _10 = 9,
  _11 = 10,
  _12 = 11,
  _13 = 12,
  _14 = 13,
  _15 = 14,
  _16 = 15,
}

export interface MidiChannelOption {
  name: string
  value: MidiChannel
}

export const channels = Object.keys(MidiChannel)
  .filter(key => isNaN(Number(key)))
  .map(key => {
    return {
      name: key.replace('_', ''),
      value: MidiChannel[key as keyof typeof MidiChannel],
    }
  })
