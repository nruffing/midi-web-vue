export function validateByte(value: number | undefined, name: string) {
  /*
    The MSB of bytes in a MIDI message indicates if it is a status byte (MSB = 1)
    or data byte (MSD = 0).
    This leaves 7 bits for the data value (0 - 127 inclusive).
    https://learn.sparkfun.com/tutorials/midi-tutorial/all#messages
  */
  if (value === undefined) {
    // undefined values are valid in this context
    return
  }
  if (value < 0 || value > 127) {
    throw new Error(`Value of ${value} for ${name} is an invalid MIDI data value which is constrainted to 7 bits (0 - 127 inclusive).`)
  }
}
