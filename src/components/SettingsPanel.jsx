import React, { useRef } from 'react'

export default function SettingsPanel({ settings, onChange, onClose }) {
  const fileInputRef = useRef(null)

  function handleFileUpload(e) {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      // Stored as a base64 data URL so it persists directly in chrome.storage.local
      onChange('wallpaperUrl', reader.result)
      onChange('wallpaperSource', 'upload')
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Customize</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <section>
          <h3>Wallpaper</h3>
          <button className="upload-btn" onClick={() => fileInputRef.current.click()}>
            Upload image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          <label className="slider-label">
            Blur: {settings.blur}px
            <input
              type="range"
              min="0"
              max="20"
              value={settings.blur}
              onChange={(e) => onChange('blur', Number(e.target.value))}
            />
          </label>

          <label className="slider-label">
            Dim: {Math.round(settings.dim * 100)}%
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.dim}
              onChange={(e) => onChange('dim', Number(e.target.value))}
            />
          </label>
        </section>

        <section>
          <h3>Widgets</h3>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={settings.showClock}
              onChange={(e) => onChange('showClock', e.target.checked)}
            />
            Show clock
          </label>
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={settings.showCalendar}
              onChange={(e) => onChange('showCalendar', e.target.checked)}
            />
            Show calendar
          </label>
        </section>

        <section>
          <h3>Clock format</h3>
          <label className="toggle-label">
            <input
              type="radio"
              name="clockFormat"
              checked={settings.clockFormat === '24h'}
              onChange={() => onChange('clockFormat', '24h')}
            />
            24-hour
          </label>
          <label className="toggle-label">
            <input
              type="radio"
              name="clockFormat"
              checked={settings.clockFormat === '12h'}
              onChange={() => onChange('clockFormat', '12h')}
            />
            12-hour
          </label>
        </section>

        <section>
          <h3>Accent color</h3>
          <input
            type="color"
            value={settings.accentColor}
            onChange={(e) => onChange('accentColor', e.target.value)}
          />
        </section>
      </div>
    </div>
  )
}