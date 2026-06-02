# Biome Policy

- Keep `biome.json` compact and explicit. Prefer Biome defaults unless the project intentionally needs a different
  behavior.
- Do not add explicit defaults such as `formatter.enabled`, `linter.enabled`, `assist.enabled`, or
  `linter.rules.recommended` just for completeness.
- Every setting in `biome.json` should document an actual project preference or compatibility need, not mirror generated
  template noise.
- Keep VCS integration enabled with Git ignore support. The project relies on `.gitignore` to keep generated and service
  files such as `.next`, `node_modules`, build output, IDE metadata, generated declarations, and local package artifacts
  out of Biome checks.
- Keep the Next and React lint domains enabled because this is a Next/React application.
- Keep JavaScript formatter preferences explicit: single quotes, no unnecessary semicolons, single JSX quotes, and
  as-needed arrow parentheses.
- Keep HTML formatter support enabled so checked HTML-like files follow the same project tooling path.
- Keep JSON comments disabled. Project JSON files should be strict JSON, not JSONC.
- Keep Tailwind CSS v4 parser support enabled through `css.parser.tailwindDirectives`.
- Do not add a `suspicious.noUnknownAtRules` exception unless the current Biome version again reports Tailwind v4
  directives such as `@theme` as false positives.
- Keep Tailwind utility class sorting enabled through Biome's `nursery.useSortedClasses` rule.
- Keep attribute sorting enabled through `assist.actions.source.useSortedAttributes`.
- Keep `style.noUnusedTemplateLiteral` enabled to catch unnecessary template literals.
- Do not add `files.includes` globs that duplicate `.gitignore` unless Biome needs a narrower project-specific scope.
- Biome does not format Markdown in this setup. Format Markdown files manually or with the editor, and avoid assuming
  `bun run check:lint` validates Markdown formatting.
