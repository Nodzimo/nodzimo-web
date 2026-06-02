# Code Style Conventions

## JSX Literal Policy

- In hand-authored TSX source, prefer expression containers for string literal prop values, such as
  `variant={'default'}`.
- Do not prefer bare string JSX attributes in TSX source.
- Do not apply this rule to raw HTML, raw SVG, MDX, CSS, or generated files.
- Keep boolean shorthand for boolean props when it is the clearest form.
- Keep spread props as spreads.
- Keep attribute values that are already expressions as expressions.

## Quote Policy

- JS, TS, and TSX use single quotes where possible.
- JSX string literals should still be inside expression containers in TSX source, for example `kind={'primary'}`.
- CSS may use single quotes where practical, but double quotes are acceptable when nested quotes make them clearer or
  when tool output requires them.
- Raw HTML and raw SVG may keep double-quoted attributes. Do not churn raw SVG assets only to satisfy JS quote taste.
- Markdown fenced code blocks should use a language tag only when the snippet is syntactically valid as that language
  on its own. Use `text` for partial JSX attributes, JSON fragments, placeholders, or intentionally invalid examples.

## Rest Naming

- Component props remainder: `restProps`.
- Function/helper arg remainder: `restArgs`.
- Route/query/config parameter remainder: `restParams`.
- Use `props`, `args`, or `params` only when the object is not a remainder, for example a whole input object passed into
  a helper or component without destructuring in the same binding.

## Type And Interface Policy

- Use `type` where TypeScript type composition is the point: unions, intersections, utility types,
  `ComponentProps<...>`, extracted callback signatures, and aliases derived from literal tables.
- Use `interface` where an object contract is intentionally open, extendable, naturally implemented/augmented,
  declaration-merge-friendly, or external-facing with extension as part of the model.
- Do not convert between `type` and `interface` only for taste or only because one form sorts better. If the best choice
  is not clear, report the candidate and reason instead of editing.

## File Extension Policy

- Use `.ts` for TypeScript files without JSX.
- Use `.tsx` for files that contain JSX.
- Do not keep a `.tsx` extension only because the file is part of a React component folder.
- Do not rename framework convention files in ways that conflict with Next's expected file names.
- Do not rename generated files manually.
- When renaming `.tsx` to `.ts` or `.ts` to `.tsx`, update local imports as needed and run TypeScript verification.

## Import Path Policy

- Do not include explicit `.ts` or `.tsx` extensions in TypeScript source imports.
- The project resolver and bundler already resolve TypeScript source modules.
- Extensionless imports survive `.ts` / `.tsx` renames better.
- Do not apply this rule to non-TypeScript asset imports where the extension is the contract, such as CSS, raw Markdown,
  or query-suffixed imports.

## Export Style Policy

- Choose export style by file shape, not personal preference.
- Use default exports only for Next framework convention files that require them, such as `page.tsx`, `layout.tsx`,
  `loading.tsx`, `not-found.tsx`, `error.tsx`, `template.tsx`, and config entry points.
- Use direct named exports for small leaf files with one primary runtime export and maybe its local type.
- Use a grouped export block at the end for compound or multipart files where many local declarations are intentionally
  public.
- Do not churn export style in files where the current shape is already clear.

## Literal Table Policy

- Use module-scope `UPPER_SNAKE_CASE` for intentional immutable literal tables, mappings, defaults, and finite option
  lists.
- Use `as const` when downstream code derives unions from values or keys.
- When validating against an external finite union, preserve literal inference and validate shape with
  `satisfies readonly SomeType[]`.
- Do not duplicate unions by hand when they can be derived from a literal table.
- For object mappings, derive key and value types from the mapping.
- For runtime APIs that widen keys, cast narrowly after the literal object is declared.
- Do not rename every module-scope `const` to `UPPER_SNAKE_CASE`. A `const` binding only prevents rebinding; it does
  not make the referenced value immutable.
- Keep camelCase for mutable objects, class instances, framework descriptors, factory return values, and `next/font`
  instances unless the returned value is explicitly frozen or readonly and local conventions already treat that exact
  kind of value as a constant.

## Declaration Spacing Policy

- Separate multiline declarations from neighboring declarations with blank lines when they would otherwise visually
  stick to single-line constants or functions.
- Closely related one-line constants may stay grouped.
- Do not add blank lines between every small local binding.
- Use the rule when a multiline array, object, function, or expression creates a visual block that should be scanned as
  its own unit.
