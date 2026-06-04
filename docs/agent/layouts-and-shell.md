# Layouts And Shell

- Keep `<html>` and `<body>` in the route layout. They are part of the Next root layout contract.
- The top-level `src/app/layout.tsx` exists for the root `not-found.tsx` fallback and should stay minimal: import
  `@nodzimo/nodzimo-ui/styles.css`, then `./globals.css`, and pass through `children`.
- It is fine to extract providers, header/footer/main shell components, and font setup out of the layout.
- Keep app-wide `next/font` setup in `src/app/_lib/fonts.ts` when root special files such as `not-found.tsx` or
  `global-error.tsx` need the same font variables. Export font variables/classes only; do not hide unrelated
  HTML/Tailwind classes in font helpers.
- Provider wrappers should stay thin. For `NextIntlClientProvider`, keep `messages={null}` unless client-side
  translations are intentionally needed.
