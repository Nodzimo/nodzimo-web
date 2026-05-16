# Next Rendering Model

## Table Of Contents

- Server Components And RSC
- Server-Side Rendering
- Client Components
- Static And SSG
- Dynamic Rendering
- Streaming And Suspense
- Choosing A Mode
- Boundary Debugging
- Project Checks

## Server Components And RSC

Pages and layouts are Server Components by default in the App Router. They are the right default for this project
because they can run server-side logic, fetch data close to the source, keep secrets out of the browser, generate
metadata, set locale state, and reduce client JavaScript.

React Server Components produce an RSC payload, not just HTML. That payload contains rendered Server Component output,
placeholders for Client Components, references to client JavaScript, and serializable props passed from server to
client.

RSC uses React's `react-server` condition. This is stricter than ordinary server rendering. Do not use these in Server
Components:

- `createContext` / `useContext` providers in the server graph.
- `useState`, `useEffect`, and other client-side hooks.
- Event handlers such as `onClick` and `onChange`.
- Browser APIs such as `window`, `document`, `localStorage`, or geolocation.
- Third-party UI packages that require those APIs unless they are behind a client boundary.

Use Server Components for:

- Static route shells and content.
- `generateMetadata` and server metadata work.
- Locale setup with `setRequestLocale` / route-local helpers.
- Server-only data access, secrets, and database/API calls.
- Passing serializable data into small Client Components.

## Server-Side Rendering

SSR is the server HTML render pass. It can render ordinary React components on the server and may have APIs such as
`createContext`, `forwardRef`, `createElement`, and `useContext` available through normal React.

SSR-safe is not the same as RSC-safe. A package may render fine during SSR but fail when its module top level is
imported
in the RSC graph. This is why `createContext is not a function` often points to an RSC boundary problem, not a generic
server-rendering problem.

## Client Components

A Client Component starts at a top-level `'use client'` directive. Everything imported into that module's client graph
is
part of the client boundary.

Use Client Components for:

- Local state and event handlers.
- Effects and browser APIs.
- Custom client hooks.
- Third-party widgets that are not RSC-safe.
- Context providers.

Keep client boundaries as deep and narrow as practical. Prefer a Server Component page/layout that renders small Client
Components for interactive islands. This reduces client JavaScript and keeps static server-rendered regions optimizable.

Props passed from Server Components to Client Components must be serializable.

## Static And SSG

Static/SSG means the route can be rendered at build time. It is the preferred baseline for this app's current localized
content routes. It gives fast initial HTML, CDN-friendly output, less runtime server work, and predictable route tables.

SSG does not mean "no Client Components". A static page can include Client Components; Next pre-renders the HTML and
hydrates the client islands later.

SSG also does not prove that every dependency is RSC-pure. It only proves the route did not require dynamic runtime
rendering during the build.

In this project:

- `[locale]/layout.tsx` validates locale params and calls `setRequestLocale` through `setStaticLocaleFromParams`.
- Pages/layout children that receive params should call `useStaticLocale(params)` or the async helper before server
  `next-intl` APIs when static rendering matters.
- Build route table output should remain static/SSG for the current localized routes unless dynamic rendering is
  intentional.

## Dynamic Rendering

Dynamic rendering means the route depends on request-time information and must render at request time.

Common dynamic triggers:

- `headers()` or `cookies()`.
- Page `searchParams`.
- Auth/session or per-request personalization.
- Uncached fetches or runtime data that cannot be known at build time.
- `connection()` when a route intentionally waits for an incoming request before continuing.

Use dynamic rendering when the actual HTML must differ per request. Do not use it just to add local interactivity; use a
Client Component for that.

If a static page needs query-string-driven controls, prefer client-side query handling when the server HTML does not
need to change. If server HTML must depend on `searchParams`, expect dynamic rendering.

## Streaming And Suspense

Streaming lets stable parts of the route show while slower server work resolves.

Use `loading.tsx` for a route-segment fallback around the page below that segment. Use `<Suspense>` closer to slow or
uncached data for more precise control.

Important limitation: runtime or uncached data in a layout can block navigation before a same-segment `loading.tsx`
fallback can help. Move that work into the page or wrap the smaller async region in `<Suspense>` where possible.

## Choosing A Mode

Prefer this order:

1. Server Component + SSG/cache for static content, locale setup, metadata, and server data.
2. Server Component page with small Client Components for interactivity.
3. Server Component with `<Suspense>` around slow/uncached server regions when streaming improves UX.
4. Dynamic rendering only when request-time HTML is required.
5. Fully client-side rendering only for UI that fundamentally depends on browser state and does not need meaningful
   server HTML.

## Boundary Debugging

For `TypeError: createContext is not a function`, `useState`/`useEffect` Server Component errors, or similar build
failures:

1. Reproduce with `bun run build`.
2. Identify the route named in the build error.
3. Inspect the route's imports and route-local barrels.
4. Check whether imports come from `@sefo/nodzimo-ui` vs `@sefo/nodzimo-ui/client`.
5. Inspect third-party package boundaries. A package that uses context/hooks may need a local Client Component wrapper
   or a different import entrypoint.
6. Search built server chunks when the source chain is unclear:

```powershell
rg -n "createContext|useContext|useState|useEffect|@sefo/nodzimo-ui|lucide-react|@base-ui" .next\server\chunks .next\server\app
```

Interpretation:

- A failure during "Collecting page data" often means module evaluation failed while Next was preparing static output.
- A Client Component can appear in server manifests/chunks as a reference; that alone is not a bug.
- The problem is usually an unsafe module being evaluated in the RSC graph, or a package entrypoint missing the correct
  client boundary.

## Project Checks

- `bun run type:check`: route typegen and TypeScript.
- `bun run build`: required for routing/rendering/i18n/metadata/provider/App Router changes.
- `bun run project:audit`: non-build audit pass.
- `bun run project:verify`: install, audit, and production build before production-ready dependency or framework
  changes.

Watch the build route table. Expected output for current localized routes is static/SSG, not `ƒ Dynamic`, except
middleware/proxy.

