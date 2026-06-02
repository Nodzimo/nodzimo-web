# App Router Structure

- Keep route-specific code colocated with the route segment.
- Use private route folders such as `_components` and `_lib` under `src/app/[locale]`.
- Use `src/components` only for genuinely shared UI primitives that are not owned by a route.
- Route-local barrels are allowed when they define the public surface of a local folder, e.g.
  `src/app/[locale]/_components/index.ts`.
- Prefer relative imports for nearby route-local files and `@/` imports for cross-boundary project modules.
