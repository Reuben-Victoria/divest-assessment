# Divest Assessment

A small Next.js application used for the Divest assessment Invoice App. It includes a local JSON API (served by json-server) and a Next.js frontend built with SCSS.

## Quick summary

- Frontend: Next.js (app directory)
- Local API: json-server reading `src/data.json` (script: `server`)

## Prerequisites

- Node.js (v18 or later recommended)
- pnpm (recommended since a pnpm lockfile exists), or npm/yarn

If you don't have pnpm installed, you can install it with npm:

```powershell
npm install -g pnpm
```

## Install

From the project root:

```powershell
# Install dependencies (pnpm recommended)
pnpm install
# or, if you prefer npm
npm install
```

## Start the local JSON API server

The repository includes a small fake API powered by `json-server` that serves `src/data.json` on port 5000.

Start it in a separate terminal:

```powershell
# using pnpm
pnpm run server
# or with npm
npm run server
```

After starting, the JSON API will be available at:

http://localhost:5000

You can inspect `src/data.json` to see the data shape used by the frontend.

## Run the frontend in development

Start the Next.js dev server (hot reload enabled):

```powershell
pnpm dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

Note: Run the `server` command (above) in another terminal if the app needs the local API.

## Build and run production

To build the app and run it in production mode:

```powershell
pnpm build
pnpm start
# or with npm
npm run build
npm run start
```

By default `next start` serves the production build on port 3000.

## Available scripts

These scripts are available from `package.json`:

- `dev` — next dev (development server)
- `build` — next build (production build)
- `start` — next start (serve production build)
- `lint` — run ESLint
- `server` — json-server --watch src/data.json --port 5000 (local JSON API)

Use `pnpm run <script>` or `npm run <script>` to run them.

## Project structure (high level)

- `app/` — Next.js app pages and layout
- `src/components/` — React components used by the app
- `src/styles/` — SCSS styles
- `src/data.json` — sample data used by `json-server`
- `src/services/` — API wrappers/hooks

## Troubleshooting

- If ports 3000 or 5000 are already in use, either stop the occupying process or run the script with a different port.
- If `pnpm` is not available, use `npm` (commands above show equivalents).
- If `json-server` fails to start, ensure dependencies were installed and the `json-server` package is present in `package.json` (it is a dependency in this project).

