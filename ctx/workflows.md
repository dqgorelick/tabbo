# Workflows

See `package.json` scripts and `README.md#working-on-the-extension`. Do not duplicate full scripts here.

- Setup: `npm install`
- Build: `npm run build` (`scripts/build.sh` via Parcel)
- Clean + build: `npm run clean-build`
- Pack: `npm run pack`
- Test: `npm test` (Jest — see `jest.config.js`, `tests/`)
- Lint: `npm run lint-package`, `npm run lint-typescript`
- Format: `npm run format` (`format-html`, `format-css`, `format-js`)
- Release: `.github/workflows/release.yml` builds via `npm run all` and uploads `tabbo-chrome-<tag>.zip` + `tabbo-firefox-<tag>.zip` on release published or manual backfill.

Load unpacked output per browser docs after building.
