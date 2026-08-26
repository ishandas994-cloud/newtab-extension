import React, { useEffect, useState } from 'react'

// Reads Chrome's built-in "most visited sites" list (same data Chrome's
// own new tab page uses) and renders it as a vertical sidebar.
export default function FrequentSites({ open, onToggle }) {
  const [sites, setSites] = useState([])

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.topSites) {
      chrome.topSites.get((result) => {
        setSites(result.slice(0, 8))
      })
    }
  }, [])

  function faviconFor(url) {
    try {
      const domain = new URL(url).hostname
      return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`
    } catch {
      return ''
    }
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        onClick={onToggle}
        style={{ left: open ? '210px' : '10px' }}
      >
        {open ? '‹' : '›'}
      </button>

      <div className={`frequent-sidebar ${open ? 'open' : 'closed'}`}>
        {sites.map((site) => (
          
            key={site.url}
            href={site.url}
            className="frequent-site"
            title={site.title || site.url}
          >
            <img src={faviconFor(site.url)} alt="" />
            <span>{site.title || site.url}</span>
          </a>
        ))}
        {sites.length === 0 && (
          <div className="frequent-empty">No frequent sites yet</div>
        )}
      </div>
    </>
  )
}