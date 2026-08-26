import React from 'react'

// Renders the full-bleed background image with blur/dim controls.
// Falls back to a gradient if no wallpaper URL is set yet.
export default function Wallpaper({ url, blur, dim }) {
  const backgroundStyle = url
    ? {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : {
        background: 'linear-gradient(135deg, #1e293b, #0f172a)'
      }

  return (
    <div className="wallpaper-layer" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <div
        style={{
          ...backgroundStyle,
          position: 'absolute',
          inset: 0,
          filter: `blur(${blur}px)`,
          transform: blur > 0 ? 'scale(1.05)' : 'none' // avoids blurred edges showing
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(0, 0, 0, ${dim})`
        }}
      />
    </div>
  )
}