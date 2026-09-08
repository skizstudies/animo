# ANIMO — Cooperative Dashboard

AI orchestrator for Philippine farming cooperatives, built for Hack4AProgress 2026. This is the Cooperative Coordinator dashboard: Sentinel-2 evidence gathering and automated PCIC report drafting (**Insurance**), and an AI recommender that connects buyers to farmers who can fill their supply gaps (**Recovery**).

See [CLAUDE.md](./CLAUDE.md) for the full design-system and product context handed off from prototyping.

## Stack

React + TypeScript + Vite + Tailwind CSS. No backend — the MVP runs on mock fixtures shaped like a real API response, so a backend can slot in later without touching components.

## Run it

```bash
npm install
npm run dev
```

## Structure

```
src/
  components/layout/   Sidebar, Topbar, shared shell pieces
  pages/                 Overview, Insurance, Recovery, Farm Map
  data/                   Mock fixtures
  hooks/                  usePhtClock, useTheme
```
