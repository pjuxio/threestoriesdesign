# CLAUDE.md — Handyman-11ty

## Project Overview
Single-page lead generation website for "Pro Handyman MD," a Maryland-based handyman service. Built with Eleventy (11ty) v3 and deployed to Netlify.

## Commands

```bash
npm start        # Dev server with live reload
npm run build    # Production build → _site/
```

## Architecture

```
src/
├── _data/site.js        # Global data (e.g., current year)
├── assets/css/main.css  # All styles (~983 lines, CSS custom properties)
├── assets/js/main.js    # Vanilla JS (~136 lines, IIFE pattern)
└── index.njk            # Single Nunjucks template (~634 lines)
_site/                   # Build output (do not edit)
.eleventy.js             # Eleventy config (input: src, output: _site)
netlify.toml             # Build + redirect config
```

## Key Conventions

### CSS
- CSS custom properties (variables) for all colors, spacing, shadows — defined at `:root`
- Mobile-first responsive: breakpoints at 1024px, 768px, 480px
- Color scheme: navy `#1e3a5f` (primary), orange `#f97316` (accent/CTA)
- Fluid typography with `clamp()`

### JavaScript
- Vanilla JS only — no frameworks, ES5-compatible for broad support
- IIFE pattern for scope encapsulation
- Intersection Observer for scroll-triggered animations
- Form submission via `fetch()` to Netlify Forms, with native form fallback

### Templates
- Nunjucks (`.njk`) with front matter for page metadata
- Single-page layout: sections use anchor IDs (`#services`, `#about`, `#contact`)
- Inline SVG icons throughout

## Forms
Two forms (hero + contact), both processed by Netlify Forms:
- Identified by `name` attribute on `<form>` elements
- Client-side validation only (Netlify handles backend validation)
- Success state: hidden div revealed after successful `fetch()` submission

## Deployment
- Platform: Netlify
- All traffic redirects to `/index.html` (SPA-style, configured in `netlify.toml`)
- No backend — Netlify Forms handles all form data

## What to Avoid
- Do not add npm dependencies without good reason — the zero-runtime-dependency approach is intentional
- Do not edit files in `_site/` — it is fully generated on build
- Do not introduce a JS framework; vanilla JS is the deliberate choice here
