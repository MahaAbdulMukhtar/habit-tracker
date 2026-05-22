# Habit Tracker

A simple weekly habit tracker built with React and Vite.

## Features

- Add, rename, and delete habits
- Weekly habit grid with checkmark toggles
- Habit streak counter
- Week navigation: previous, next, and today
- Data persistence using `localStorage`
- Responsive layout with plain CSS

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm 10+ or compatible package manager

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Testing

This project does not currently include automated tests. You can still verify the app by running it locally and exercising the UI manually.

## Project Structure

- `src/` — application source code
  - `components/` — React UI components
  - `hooks/` — custom hooks
  - `utils/` — helper functions
- `public/` — static assets
- `index.html` — app entry HTML
- `vite.config.js` — Vite configuration

## Notes

- Habit data is stored in `localStorage`, so it remains after page reloads.
- The app is intentionally lightweight and built without external UI libraries.
