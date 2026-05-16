---
name: next-rendering-diagnostics
description: Diagnose and guide Next.js 16 App Router rendering behavior in nodzimo-web. Use when Codex needs to choose between Server Components, Client Components, SSG/static rendering, dynamic rendering, SSR, Suspense streaming, or debug build/runtime failures involving RSC boundaries, createContext/useContext, hooks, third-party packages, UI-kit imports, route table changes, request-time APIs, or unexpected dynamic routes.
---

# Next Rendering Diagnostics

## Overview

Use this skill for this Next 16 consumer app when a task touches rendering mode, App Router boundaries, static/dynamic
behavior, third-party package imports, or confusing build errors.

Before changing behavior, read the relevant installed Next docs in `node_modules/next/dist/docs/`. For the detailed
local model and checklist, read `references/rendering-model.md`.

## Quick Model

- Server Components are the default for pages/layouts. Prefer them for static shell, metadata, locale setup, server
  data, secrets, and less client JavaScript.
- RSC is the server component graph/payload layer: it decides what runs only on the server, what is serialized to client
  islands, and what JavaScript can be omitted from the browser bundle.
- SSR is the HTML render pass: it turns the RSC payload plus Client Component references into initial HTML for first
  load, SSG output, or request-time responses.
- In App Router, RSC and SSR usually cooperate. RSC is not "SSR replacement" and SSR is not a license to import
  SSR-safe packages into the RSC graph.
- RSC is stricter than SSR. RSC cannot use context APIs, state/effect hooks, event handlers, or browser APIs.
- Client Components begin at `'use client'`. Use them for interactivity, browser APIs, state/effects, and unsafe
  third-party widgets. Keep the boundary deep and narrow.
- Static/SSG is the preferred baseline for current localized content routes. Dynamic rendering is a deliberate choice
  for
  request-time data.
- A Server Component can render a Client Component without making the whole route dynamic.

## Workflow

1. Identify the route and boundary.
    - Is the file a page/layout/loading/not-found/error/template or a normal component?
    - Is it inside `src/app/[locale]`, root `src/app`, or a client component tree?
    - Does it import from `@sefo/nodzimo-ui` or `@sefo/nodzimo-ui/client` correctly?

2. Classify the need.
    - Static content, locale setup, metadata, server data, or secrets: prefer Server Component and SSG/cache.
    - State, event handlers, browser APIs, custom client hooks, or unsafe third-party UI: use a Client Component
      boundary.
    - Request-time data such as `headers()`, `cookies()`, `searchParams`, uncached fetches, auth/session, or
      `connection()`: expect dynamic rendering unless the data is moved, cached, or handled on the client.

3. Preserve static rendering when intended.
    - In localized pages/layouts, keep `setRequestLocale` / `useStaticLocale(params)` before server `next-intl` APIs.
    - Avoid `searchParams` in pages that should remain SSG.
    - Keep providers deep and thin.

4. Diagnose boundary errors.
    - For `createContext is not a function`, `useState` in Server Component, or similar failures, inspect the import
      chain from the route through local components and package entrypoints.
    - Check whether a third-party package or UI-kit root import is being evaluated in the RSC graph.
    - Inspect `.next/server/chunks` only after reproducing with `bun run build`.

5. Verify.
    - Use `bun run type:check` for route/types.
    - Use `bun run build` when rendering mode, routing, metadata, providers, i18n, or App Router special files changed.
    - Watch the route table. Current localized routes should stay static/SSG unless dynamic rendering is intentional.
