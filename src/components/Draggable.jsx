import React, { useRef, useCallback } from 'react'

// Wraps any widget and makes it draggable. Position is stored as
// percentages (0-100) of the viewport so it stays correct across
// different screen sizes.
export default function Draggable({ position, onPositionChange, children }) {
  const dragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })
  const elRef = useRef(null)

  const handleMouseDown = useCallback((e) => {
    dragging.current = true
    const rect = elRef.current.getBoundingClientRect()
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (!dragging.current) return
    const x = ((e.clientX - offset.current.x + elRef.current.offsetWidth / 2) / window.innerWidth) * 100
    const y = ((e.clientY - offset.current.y + elRef.current.offsetHeight / 2) / window.innerHeight) * 100
    onPositionChange({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y))
    })
  }, [onPositionChange])

  const handleMouseUp = useCallback(() => {
    dragging.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }, [handleMouseMove])

  return (
    <div
      ref={elRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'absolute',
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'grab',
        userSelect: 'none'
      }}
    >
      {children}
    </div>
  )
}