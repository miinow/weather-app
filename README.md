# Weather App (React + Vite + TypeScript)

A simple, fast weather application built with React 19, Vite 7, and TypeScript. It fetches current conditions and a 7‑day daily forecast from Open‑Meteo and lets you search for locations.

## Setup and Run

Prerequisites
- Node.js: Requires 18.20.0+, recommends 20+ for best results.
- npm (comes with Node)

Install
- `npm install`

Development (HMR)
- `npm run dev` - Open the URL printed in the terminal (typically http://localhost:5173)

Run tests
- `npm test` - Uses Vitest in a jsdom environment

Build for production
- `npm run build` - Outputs to dist/

Preview the production build
- `npm run preview` - Serves dist/ locally so you can verify the build

Environment and API keys
- None required. The app calls public Open‑Meteo endpoints for forecast and geocoding:
  - Forecast: https://api.open-meteo.com/v1/forecast
  - Geocoding: https://geocoding-api.open-meteo.com/v1/search
 
## Project structure
```
├─ src
│  ├─ api
│  │  ├─ weather.ts           ## request weather related data
│  │  └─ location.ts          ## request location data
│  ├─ components              
│  │  ├─ MainWeatherCard.tsx
│  │  ├─ DailyWeatherList.tsx
│  │  ├─ DailyWeatherItem.tsx
│  │  ├─ LocationSearchBar.tsx
│  │  ├─ WeatherIcon.tsx
│  │  └─ Skeleton.tsx
│  ├─ utils
│  │  ├─ time.ts             ## time related utils
│  │  ├─ weather.tsx         ## weather related utils
│  │  └─ location.ts         ## default location
│  ├─ types
│  │  └─ index.ts           
│  └─ App.tsx              
├─ tests                     ## unit tests grouped by domain
│  ├─ api
│  │  ├─ weather.test.ts
│  │  └─ location.test.ts
│  ├─ components
│  │  ├─ DailyWeatherList.test.tsx
│  │  ├─ DailyWeatherItem.test.tsx
│  │  ├─ MainWeatherCard.test.tsx
│  │  └─ WeatherIcon.test.tsx
│  ├─ utils
│  │  ├─ time.test.ts
│  │  └─ weather.test.tsx
│  └─ setup.ts             
├─ vite.config.ts
├─ vitest.config.ts
├─ tsconfig*.json           
├─ public
└─ README.md
```

## Design

API choice:
  - The WeatherStack API's free tier has limitations—it doesn't provide access to historical weather data or weather forecasts, so I switched to using Open‑Meteo for the weather data API.
  - Open‑Meteo provides free current and forecast data without keys. Trade‑off: its daily forecast lacks detail fields (humidity/wind), so we fetch details separately on demand.

Fetching strategy
- Two-step details: Daily endpoints return summaries only. On selection, we make a second request for the day’s hourly slice and use the noon index as a representative snapshot. Trade‑offs:
  - Pros: fast initial load; network cost only when the user asks for details.
  - Cons: one extra request per selection; noon may not match a user’s local peak. Alternatives: pick closest to “now” for the selected date or compute min/max/median.
- Future optimizations: prefetch the next/previous day’s details after the first interaction; debounce repeated selections; cache user's favorite locations.

Testability and time handling
- Dynamic time utilities: api/weather.ts dynamically imports getDate/getDayName to make vi.mock work consistently across test files (prevents static import hoisting conflicts). Trade‑off: negligible runtime cost for much cleaner tests.
- Date formatting: dayjs is used to format YYYY‑MM‑DD and weekday names for consistency and timezone correctness.

UI, UX, and state boundaries
- Component roles:
  - MainWeatherCard renders whatever WeatherData it receives (current or selected detail) plus header labels (city/day/date).
  - DailyWeatherList shows a lightweight skeleton while loading and renders DailyWeatherItem chips otherwise.
  - WeatherIcon maps abstract icon keys (sunny, rainy, etc.) to lucide‑react icons, with a safe Cloud fallback for unknown keys.
- Styling: Tailwind utility classes keep styles local and predictable; no bespoke CSS tooling.
- Location search: a small, custom debounced input with a requestId guard to avoid race conditions. 
- Refresh cadence: data is refreshed hourly via setInterval.

Caching with a Service Worker
- This project includes a custom service worker at public/service-worker.js and registers it in src/main.tsx.
- What it does (summary of strategies):
  - Versioned caches: STATIC_CACHE and DATA_CACHE are versioned via a VERSION constant. On activate, old caches are cleaned up and clients are claimed.
  - Navigation preload: If supported, navigation preload is enabled for faster navigations.
  - SPA navigations (request.mode === "navigate"): tries preload/network, and falls back to cached /index.html when offline.
  - Same-origin static assets: cache-first. First look in the STATIC_CACHE, then fetch and update the cache when missing.
  - Open‑Meteo APIs (forecast, geocoding): stale-while-revalidate. If there’s a cached response, it returns immediately and refreshes in the background; otherwise it fetches from the network and caches a successful response. If offline with no cache, it returns a small 503 JSON fallback.
  - Other requests: network-first with cache fallback.
- Registration: handled in src/main.tsx (navigator.serviceWorker.register("/service-worker.js") on window load). Nothing else is required.
- Updating the SW: bump the VERSION string in public/service-worker.js to force a new cache name; deploy the new build; clients will activate the new worker and stale caches will be purged.
- Local development notes: the service worker also runs in dev. If you see unexpected caching during development, hard-refresh (Ctrl/Cmd+Shift+R) or unregister via DevTools → Application → Service Workers.

Testing philosophy
- Coverage focuses on core correctness rather than end‑to‑end flows:
  - API mappers (current, daily, per‑date) with mocked fetch responses.
  - Utilities (time, weather code/icon maps).
  - Components (list/item interaction, main card rendering, icon fallback).
- Tools: Vitest + Testing Library + jest‑dom. Time is either mocked via vi.setSystemTime or by mocking the time module.
- Tests are grouped under tests/ by domain for clarity and scale.

TypeScript and configuration
- Separate tsconfig projects for app, node (Vite/vitest config), and tests scope compiler options for speed and correctness.
- The tests project enables JSX and jsdom types; vitest.config.ts wires up tests/setup.ts for jest‑dom.
