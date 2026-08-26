// Thin wrapper around chrome.storage.local so components
// don't need to deal with the callback/promise API directly.

const isExtensionEnv = typeof chrome !== 'undefined' && chrome.storage

export async function getStorage(keys) {
  if (!isExtensionEnv) {
    // Fallback for local dev outside the extension (npm run dev in a normal tab)
    const result = {}
    keys.forEach((key) => {
      const raw = localStorage.getItem(key)
      if (raw !== null) {
        try {
          result[key] = JSON.parse(raw)
        } catch {
          result[key] = raw
        }
      }
    })
    return result
  }
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result) => resolve(result))
  })
}

export async function setStorage(obj) {
  if (!isExtensionEnv) {
    Object.entries(obj).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    return
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(obj, () => resolve())
  })
}

// Default settings shape — used the first time the extension runs
export const DEFAULT_SETTINGS = {
  wallpaperUrl: '',
  wallpaperSource: 'default',
  blur: 0,
  dim: 0.2,
  showClock: true,
  showCalendar: true,
  clockFormat: '24h',
  accentColor: '#7dd3fc',
  clockPosition: { x: 50, y: 35 },      // percentage-based, so it stays correct on any screen size
  calendarPosition: { x: 50, y: 60 }
}
