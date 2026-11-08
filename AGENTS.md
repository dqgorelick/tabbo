# AGENTS.md

This repo uses `ctx/` as curated project context. Read it first.

1. Start with `ctx/_index.md` for file map and read order.
2. Read only the `ctx/` files relevant to the task. See `_index.md` for guidance.
3. Canonical docs live outside `ctx/` — reference them, do not copy: `README.md`, `package.json`, `src/`, `tests/`.

## `ctx/` rules

- Keep files concise and single-topic. Split before a file grows broad.
- Reference other files by path instead of duplicating content. Example: `See ctx/workflows.md`.
- Keep context current:
  - After code/config changes, update the affected `ctx/` topic file.
  - Append durable choices to `ctx/decisions.md` as `date / decision / rationale`.
  - Update `ctx/active.md` with current focus and next steps.
