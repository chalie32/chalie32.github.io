# SongYu (Charlie) Wang — Personal Website

My portfolio site, built with **React + Vite** and deployed to **GitHub Pages**.
Available in English, 繁體中文, and 简体中文.

🔗 **Live:** https://chalie32.github.io

## Highlights
- Bento-grid layout, responsive from phone to desktop
- Interactive demos rebuilt from my real projects:
  - Rocket flight-computer PCBs with schematics
  - A flight state machine that follows the exact thresholds in my firmware (`Rocket_redunt/src/FlightController.cpp`)
  - A live telemetry dashboard (simulated data)
  - A 32-bit adder–subtractor that uses the same full-adder logic as my C program
  - A web version of my SwiftUI expiration-tracker app
- Picks the language from the browser, remembers the visitor's choice, and accepts a `?lang=` URL parameter

## Run locally
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # output in dist/
```

## Project structure
```
src/
├── App.jsx              # page shell
├── data.js              # links, images, repo list (language-independent)
├── i18n/                # en.js / zh-Hant.js / zh-Hans.js + language switcher logic
├── pages/Home.jsx       # bento grid
└── components/          # PcbShowcase, TelemetryDemo, FlightStateMachine, AdderDemo, FoodDemo, Nav
public/                  # PCB images and schematic PDFs
.github/workflows/       # auto-deploy to GitHub Pages on every push to main
```

## Deployment
Every push to `main` builds the site and publishes it through GitHub Actions
(Settings → Pages → Source: **GitHub Actions**).
