# Aniruddh Upparna — Personal Website

Personal portfolio site built with static HTML, CSS, and JavaScript. Source files live in `src/` and are compiled into `docs/`, which is served on GitHub Pages.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later recommended)
- npm (included with Node.js)

## Run locally

1. Clone the repository:

   ```bash
   git clone https://github.com/aniruddhupparna/aniruddhupparna.github.io.git
   cd aniruddhupparna.github.io
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:7000](http://localhost:7000) in your browser.

The dev server uses [BrowserSync](https://browsersync.io/) and reloads automatically when you edit files in `src/css/`, `src/js/`, or `src/index.html`.

## Build from source

To copy all assets from `src/` and rebuild CSS/JS before serving:

```bash
npx gulp build
```

This runs the full pipeline (copy → process JS → process CSS → serve) and is useful after a fresh clone or when you've changed assets under `src/assets/`.

## Project structure

```
src/          Source files (HTML, CSS, JS, images, fonts)
docs/         Built output served locally and deployed to GitHub Pages
gulpfile.js   Build and dev-server configuration
```

## Scripts

| Command       | Description                                      |
|---------------|--------------------------------------------------|
| `npm start`   | Start dev server on port 7000 with live reload   |
| `npx gulp build` | Full build from `src/` and start dev server   |
