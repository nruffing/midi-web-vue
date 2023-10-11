export enum LocalStorageKeys {
  controlSets = 'midi-web-vue-control-sets',
}

export function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorageValue<TValue>(key: string): TValue | undefined {
  const rawJson = localStorage.getItem(key)
  return rawJson ? JSON.parse(rawJson) : undefined
}
