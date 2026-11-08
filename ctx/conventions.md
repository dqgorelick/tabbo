# Conventions

- TypeScript strict via `tsconfig.json`. Run `npm run lint-typescript` after TS changes.
- Format with Prettier via `npm run format`. See `scripts/format-*.sh`.
- Extension APIs: use `webextension-polyfill`. Types: `@types/chrome`, `@types/firefox-webext-browser`.
- Keep browser differences in per-browser manifests. See `ctx/architecture.md`.
- Tests colocated by type under `tests/`. See `jest.config.js`.
