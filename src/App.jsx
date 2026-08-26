import React, { useEffect, useState } from 'react'
import Wallpaper from './components/Wallpaper.jsx'
import Clock from './components/Clock.jsx'
import Calendar from './components/Calendar.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import { getStorage, setStorage, DEFAULT_SETTINGS } from './utils/storage.js'

export default function App() {
  const [settings, setSettings] = useState(null) // null = still loading
  const [panelOpen, setPanelOpen] = useState(false)

  // Load saved settings once on mount
  useEffect(() => {
    getStorage(Object.keys(DEFAULT_SETTINGS)).then((saved) => {
      setSettings({ ...DEFAULT_SETTINGS, ...saved })
    })
  }, [])

  // Persist whenever settings change (after initial load)
  useEffect(() => {
    if (settings) {
      setStorage(settings)
    }
  }, [settings])

  function updateSetting(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (!settings) {
    return <div className="loading-screen">Loading...</div>
  }

  return (
    <div className="app">
      <Wallpaper
        url={settings.wallpaperUrl}
        blur={settings.blur}
        dim={settings.dim}
      />

      <div className="widgets">
        {settings.showClock && <Clock format={settings.clockFormat} />}
        {settings.showCalendar && <Calendar accentColor={settings.accentColor} />}
      </div>

      <button className="settings-toggle" onClick={() => setPanelOpen(true)}>
        ⚙
      </button>

      {panelOpen && (
        <SettingsPanel
          settings={settings}
          onChange={updateSetting}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  )
}