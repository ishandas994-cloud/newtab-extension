# Custom New Tab Extension

A Chrome new-tab replacement with wallpaper, clock, calendar, and interface customization.

## Features
- Custom wallpaper (upload your own image)
- Blur and dim controls for the background
- Live clock (12h/24h toggle)
- Mini calendar with month navigation
- Toggle widgets on/off
- Accent color picker
- Settings persist via chrome.storage.local

## Setup

1. Install dependencies:
   npm install

2. Run in dev mode (opens as a normal Vite app for UI iteration):
   npm run dev

3. Build for Chrome:
   npm run build

4. Load into Chrome:
   - Go to chrome://extensions
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `dist/` folder

5. Open a new tab — your custom page should load.

## Tech stack
- React + Vite
- @crxjs/vite-plugin (Manifest V3 support)
- chrome.storage.local for persistence