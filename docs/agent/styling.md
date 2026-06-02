# Styling

- Use `class`, `className`, `classNames`, `classes`, and `*_CLASSES` naming for values that contain Tailwind class
  strings, including string constants, arrays, and object tables. Reserve `style` and `styles` naming for inline style
  objects, `CSSProperties`, or other non-Tailwind style declarations.
- Keep WebStorm Tailwind autocomplete for non-JSX class tables scoped through the project Tailwind language-server
  `experimental.classRegex` setting. The regex should target variable declarations whose names contain class/className/
  classNames/classes/CLASSES, and should not include `styles`; JSX `className` attributes are already covered by the
  standard Tailwind class-attribute support. The project regex convention is adapted from the practical examples in
  <https://github.com/codewithhridoy/tailwind-autosuggestion-for-custom-classes>.
- WebStorm stores Tailwind language-server settings as escaped JSON inside `.idea/tailwindcss.xml`, which is not
  readable enough to reconstruct the regex later. Keep this human-readable minimal JSON block as the source reference
  for the shared class regex convention:

```json
{
  "experimental": {
    "classRegex": [
      [
        "(?:export\\s+)?(?:const|let|var)\\s+[\\w$]*(?:[Cc]lass(?:Name)?s?|[Cc]lasses|CLASSES|CLASS_NAME|CLASS_NAMES|CLASSNAME)[\\w$]*\\s*(?::[^=]+)?=\\s*([\\s\\S]*?)(?=\\n\\s*(?:export\\s+)?(?:const|let|var|function|type|interface|enum)\\b|$)",
        "(?:^|[:,\\[?]\\s*)'([^']*)'(?!\\s*:)"
      ],
      [
        "(?:export\\s+)?(?:const|let|var)\\s+[\\w$]*(?:[Cc]lass(?:Name)?s?|[Cc]lasses|CLASSES|CLASS_NAME|CLASS_NAMES|CLASSNAME)[\\w$]*\\s*(?::[^=]+)?=\\s*([\\s\\S]*?)(?=\\n\\s*(?:export\\s+)?(?:const|let|var|function|type|interface|enum)\\b|$)",
        "(?:^|[:,\\[?]\\s*)\"([^\"]*)\"(?!\\s*:)"
      ],
      [
        "(?:export\\s+)?(?:const|let|var)\\s+[\\w$]*(?:[Cc]lass(?:Name)?s?|[Cc]lasses|CLASSES|CLASS_NAME|CLASS_NAMES|CLASSNAME)[\\w$]*\\s*(?::[^=]+)?=\\s*([\\s\\S]*?)(?=\\n\\s*(?:export\\s+)?(?:const|let|var|function|type|interface|enum)\\b|$)",
        "(?:^|[:,\\[?]\\s*)`([^`]*)`(?!\\s*:)"
      ]
    ]
  }
}
```

- Import Tailwind/global CSS once from `src/app/layout.tsx`. Do not re-import `@import "tailwindcss"` in a root
  404-specific stylesheet.
- Import the UI kit compiled stylesheet before this app's `./globals.css` so app-level globals, CSS variables, and
  overrides have the final cascade position.
- Put global element defaults, such as `body` styles, inside `@layer base` so Tailwind utility classes can override them
  without `!important`.
- Avoid broad global link styling unless it is intentionally a site-wide default; prefer component or route-level
  Tailwind classes for specific link appearances.
