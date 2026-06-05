# Exports

- Use default exports only for framework convention files that require them, such as `page.tsx`, `layout.tsx`,
  `loading.tsx`, `not-found.tsx`, `error.tsx`, `template.tsx`, and config entry points.
- Use named exports for ordinary components, utilities, constants, and route-local helpers.
- Prefer `export function ComponentName()` for normal React components.
- Barrel files should re-export named symbols, e.g. `export { Header } from './header'`.
- Detailed export style conventions live in [Code Style Conventions](code-style-conventions.md).
