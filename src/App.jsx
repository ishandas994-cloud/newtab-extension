import React, { useEffect, useState } from 'react'
import Wallpaper from './components/Wallpaper.jsx'
import Clock from './components/Clock.jsx'
import Calendar from './components/Calendar.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import Draggable from './components/Draggable.jsx'
import SearchBar from './components/SearchBar.jsx'
import { getStorage, setStorage, DEFAULT_SETTINGS } from './utils/storage.js'

export default function App() {
  const [settings, setSettings] = useState(null)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    getStorage(Object.keys(DEFAULT_SETTINGS)).then((saved) => {
      setSettings({ ...DEFAULT_SETTINGS, ...saved })
    })
  }, [])

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

      <SearchBar />

      {settings.showClock && (
        <Draggable
          position={settings.clockPosition}
          onPositionChange={(pos) => updateSetting('clockPosition', pos)}
        >
          <Clock format={settings.clockFormat} />
        </Draggable>
      )}

      {settings.showCalendar && (
        <Draggable
          position={settings.calendarPosition}
          onPositionChange={(pos) => updateSetting('calendarPosition', pos)}
        >
          <Calendar accentColor={settings.accentColor} />
        </Draggable>
      )}

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