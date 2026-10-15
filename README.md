# MovieDB

A responsive React movie discovery app powered by the TMDB API. Browse popular, top-rated, and upcoming movies; search across the catalog; and open movie details with cast, ratings, genres, runtime, budget, and revenue.

## Run locally

1. Install Node.js 18 or newer.
2. Get an API key from [TMDB account settings](https://www.themoviedb.org/settings/api).
3. Copy `.env.example` to `.env` and replace its placeholder:

   ```env
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key
   ```

4. From the project folder, run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite. If you change the API key, restart the dev server.

TMDB API keys are used by the browser in this client-side demo. Do not put a private API secret in a publicly shared project; use a server-side proxy if the key must remain private.

## Features

- React 18, Vite, and React Router.
- Popular, top-rated, upcoming, search, and movie-detail routes.
- TMDB-backed pagination with bounded page controls and scroll-to-top.
- Abortable requests, loading/error/empty states, lazy-loaded posters, and missing-image fallbacks.
- Responsive dark interface for desktop, tablet, and mobile.

## Build

```bash
npm run build
npm run preview
```

## Open in CodeSandbox and get a share link

1. Sign in at [CodeSandbox](https://codesandbox.io/) and choose **Create** / **Import Project**.
2. Upload the project folder (or import its GitHub repository) with `package.json`, `index.html`, `vite.config.js`, and `src/`.
3. In the sandbox settings/environment variables, add `VITE_TMDB_API_KEY` with your TMDB API key. For a direct folder upload, create `.env` in the sandbox instead. Restart the sandbox after adding it.
4. Wait for dependencies to install and the Vite preview to start. Verify browsing, search, pagination, and a movie detail page.
5. Choose **Share** and copy the sandbox URL to submit. Set visibility according to the assignment's requirements.

This project has not been uploaded or published to CodeSandbox.
