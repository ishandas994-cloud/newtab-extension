# 🌐 Custom New Tab Extension

A fully customizable Chrome new-tab replacement built with React — featuring a personal wallpaper, live clock, calendar, Google search bar, and quick access to your most-visited sites, all rearrangeable to fit how you actually use your browser.

![Custom New Tab Screenshot](./screenshot.png)

## ✨ Features

- 🖼️ **Custom wallpaper** — upload your own image as the background
- 🎚️ **Blur & dim controls** — fine-tune the wallpaper so widgets stay readable
- 🕐 **Live clock** — 12-hour or 24-hour format
- 📅 **Mini calendar** — navigate months, current day highlighted
- 🖱️ **Drag-and-drop widgets** — move the clock and calendar anywhere on screen, position is remembered
- 🔍 **Search bar** — search Google or jump straight to a URL, right from the new tab
- 📌 **Frequently visited sites** — collapsible vertical sidebar showing your most-visited sites with favicons (powered by Chrome's built-in topSites API)
- ⚙️ **Settings panel** — toggle widgets on/off, change accent color, adjust everything from one place
- 💾 **Persistent settings** — everything saves automatically via `chrome.storage.local`

## 🛠️ Tech Stack

- [React](https://react.dev/) — UI components
- [Vite](https://vitejs.dev/) — build tool
- [@crxjs/vite-plugin](https://crxjs.dev/) — Manifest V3 + Vite integration
- Chrome Extension APIs: `storage`, `topSites`

## 📦 Installation & Usage

This extension isn't on the Chrome Web Store yet, so it needs to be built and loaded manually — takes about 2 minutes.

### 1. Clone the repository
```bash
git clone https://github.com/ishandas994-cloud/newtab-extension.git
cd newtab-extension
```

### 2. Install dependencies
```bash
npm install
```

### 3. Build the extension
```bash
npm run build
```
This generates a `dist/` folder containing the packaged extension.

### 4. Load it into Chrome
1. Open `chrome://extensions` in your browser
2. Turn on **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `dist` folder from this project

### 5. Try it out
Open a new tab — your custom new tab page should load automatically, replacing Chrome's default.

## 🔄 Making changes / re-testing

After editing any source file:
```bash
npm run build
```
Then go to `chrome://extensions` and click the reload icon (↻) on the extension's card, and open a new tab to see your changes.

## 📁 Project Structure
newtab-extension/
├── public/
│ └── manifest.json # Extension manifest (MV3)
├── src/
│ ├── components/
│ │ ├── Wallpaper.jsx # Background image renderer
│ │ ├── Clock.jsx # Live clock widget
│ │ ├── Calendar.jsx # Mini calendar widget
│ │ ├── SearchBar.jsx # Google search / URL bar
│ │ ├── FrequentSites.jsx # Sidebar of most-visited sites
│ │ ├── Draggable.jsx # Drag-and-drop wrapper for widgets
│ │ └── SettingsPanel.jsx # Settings drawer UI
│ ├── utils/
│ │ └── storage.js # chrome.storage wrapper + default settings
│ ├── App.jsx # Main layout
│ ├── main.jsx # React entry point
│ └── index.css # Global styles
├── index.html
├── vite.config.js
└── package.json

## 🚀 Future Improvements

- Wallpaper source from an API (Unsplash/Picsum) for daily rotating backgrounds
- Quick-links grid for manually pinned sites
- Publish to the Chrome Web Store for one-click install

## 👤 Author

**Ishan Das**
- GitHub: [@ishandas994-cloud](https://github.com/ishandas994-cloud)
- LinkedIn: [ishan-das](https://linkedin.com/in/ishan-das-13765b322)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
