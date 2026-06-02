# Collaboration

- If the user asks an architecture or best-practice question, answer first and do not edit files unless explicitly
  asked.
- If the user asks to implement, keep changes scoped and verify with the smallest relevant checks.
- Preserve the existing Russian conversational tone in user-facing discussion, but keep committed code and comments
  concise.
- Do not add broad abstractions just to reduce line count. Extract code when it creates a clear route-local component,
  provider wrapper, or shared helper.
- Keep implementation code direct and readable. Prefer named local constants over dense chains when a chain mixes data
  preparation, sorting, and rendering.
- Separate multiline declarations from neighboring declarations with blank lines when they would otherwise stick to
  single-line constants, functions, or other visual blocks. Closely related one-line constants may stay grouped.
- Use `UPPER_SNAKE_CASE` for intentional module-scope immutable tables, mappings, defaults, and finite option lists.
- Use `as const` for literal option arrays and mapping objects when the project derives a union type from their values
  or keys.
