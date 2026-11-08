# Architecture

- `src/scripts/`: extension logic — `background/`, `popup/`, `manager/`, `configuration/`, plus `tabbo.ts`, `utils.ts`, `logging.ts`.
- `src/*.html`: UI pages (`popup`, `manager`, `configuration`, `help`, `instructions`).
- Manifests: `src/manifest.json` base, plus `src/chrome-manifest.json`, `src/firefox-manifest.json`.
- `src/styles/`, `src/assets/`, `src/images/`: styling and static assets.
- Build: Parcel with webextension configs. See `.parcelrc`, `.parcelrc-webextension`, `parcel/`.
- Output: `build/` and `dist/`. Scripts: `scripts/`.
- Tests: `tests/unit/`, `tests/integration/`, `tests/functional/`.

See `package.json` for Parcel, Jest, TypeScript versions.
