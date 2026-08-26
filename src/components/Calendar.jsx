import React, { useState } from 'react'

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function Calendar({ accentColor }) {
  const [viewDate, setViewDate] = useState(new Date())
  const today = new Date()

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthLabel = viewDate.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric'
  })

  function changeMonth(delta) {
    setViewDate(new Date(year, month + delta, 1))
  }

  const cells = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`empty-${i}`} />)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday =
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()

    cells.push(
      <div
        key={day}
        style={{
          padding: '6px 0',
          borderRadius: '50%',
          background: isToday ? accentColor : 'transparent',
          color: isToday ? '#111' : '#fff',
          fontWeight: isToday ? 600 : 400
        }}
      >
        {day}
      </div>
    )
  }

  return (
    <div
      className="calendar-widget"
      style={{
        background: 'rgba(0, 0, 0, 0.35)',
        borderRadius: '16px',
        padding: '16px 20px',
        width: '260px',
        backdropFilter: 'blur(6px)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <button onClick={() => changeMonth(-1)} style={navBtnStyle}>‹</button>
        <span style={{ fontSize: '0.95rem' }}>{monthLabel}</span>
        <button onClick={() => changeMonth(1)} style={navBtnStyle}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', fontSize: '0.75rem', opacity: 0.7, marginBottom: '4px' }}>
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ textAlign: 'center' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', fontSize: '0.85rem', textAlign: 'center' }}>
        {cells}
      </div>
    </div>
  )
}

const navBtnStyle = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontSize: '1.2rem',
  cursor: 'pointer',
  padding: '0 8px'
}