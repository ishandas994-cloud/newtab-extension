import React, { useEffect, useState } from 'react'

export default function Clock({ format }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hours24 = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  let displayTime
  if (format === '12h') {
    const period = hours24 >= 12 ? 'PM' : 'AM'
    const hours12 = hours24 % 12 || 12
    displayTime = `${hours12}:${minutes} ${period}`
  } else {
    displayTime = `${String(hours24).padStart(2, '0')}:${minutes}:${seconds}`
  }

  const dateString = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="clock-widget">
      <div style={{ fontSize: '4rem', fontWeight: 300, letterSpacing: '2px' }}>
        {displayTime}
      </div>
      <div style={{ fontSize: '1.1rem', opacity: 0.85, marginTop: '4px' }}>
        {dateString}
      </div>
    </div>
  )
}