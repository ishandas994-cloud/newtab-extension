import React, { useState } from 'react'

export default function SearchBar() {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    // If it looks like a URL, go there directly; otherwise search Google
    const isUrl = /^([a-z]+:\/\/)?[^\s]+\.[a-z]{2,}(\/[^\s]*)?$/i.test(trimmed)
    const destination = isUrl
      ? (trimmed.startsWith('http') ? trimmed : `https://${trimmed}`)
      : `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`

    window.location.href = destination
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        placeholder="Search Google or type a URL"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
    </form>
  )
}