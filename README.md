# ÉCLAT — Jewelry & Diamonds

A dark-emerald haute joaillerie storefront: an editorial landing page, a
collection listing, a full product detail experience and a working bag,
wishlist, search, ring-size guide and appointment booking.

Built with **Vite + React** and hand-written CSS. No UI kit, no CSS framework,
no backend and **no image assets** — every diamond, band and gift box is drawn
as inline SVG, so the metal switcher can re-light a piece instantly and the whole
boutique ships without a single binary file.

## Stack

| Piece | Role |
| --- | --- |
| `vite` | dev server with instant HMR |
| `react` | the storefront (`src/pages`, `src/components`) |
| `src/lib/router.jsx` | hand-rolled history router — real URLs, no dependency |
| `src/components/art/JewelryArt.jsx` | the SVG jewellery: gems, bands, rivières, the portrait scene |
| `src/styles/*.css` | design system tokens in `src/index.css`, then `layout` / `home` / `product` |

## Experience

- **Home** — split editorial hero with a slider index, 4-cell trust bar, seven
  circular halo categories (a gold ring draws itself around a piece on hover),
  the dual "Art Of Forever" / "Speaks Love" banners, and Best Sellers.
- **Product** — zoomable four-view gallery (macro, profile, on-model,
  certificate), metal switcher, carat selector, ring size + size guide,
  engraving, 4 Cs, and a sticky quick-buy bar on mobile.
- **Shopping** — bag drawer with stepper and engraving notes, wishlist drawer,
  instant accent-insensitive search, appointment booking, and a currency
  switcher across USD / EUR / AED / IRR.

## Run locally (Docker, recommended)

```sh
docker compose -f docker-compose.base44.yml up -d
```

Then open <http://localhost:3000>. The service uses a plain `node:22` image with
the repository bind-mounted, installs dependencies into a `node_modules` volume
on startup and runs the Vite dev server — source edits appear immediately, with
no image rebuild.

## Run locally (without Docker)

Requires Node 20+.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # production bundle in dist/
```

## Environment variables

**None are required** — the storefront has no backend and calls no external
service. There is no `.env` file to fill in.

The only variables the code reads are sandbox-preview overrides
(`BASE44_PREVIEW_MODE`, `BASE44_SANDBOX_HOST_DOMAIN`, supplied by the Base44
sandbox, and `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, which the platform sets
for Vite):

| Variable | Enabled (`BASE44_PREVIEW_MODE="1"`) | Unset / other value |
| --- | --- | --- |
| `BASE44_PREVIEW_MODE` | Adds `.<BASE44_SANDBOX_HOST_DOMAIN>` to Vite's `server.allowedHosts` and pins HMR to `wss` on port 443, because the preview proxy terminates TLS and forwards requests under a rotating sandbox hostname. | Stock Vite behaviour: localhost-only hosts, HMR on the dev port. |
| `BASE44_SANDBOX_HOST_DOMAIN` | Supplies the domain appended to the allowlist. | Ignored. |

These overrides exist only so the sandboxed preview can reach the dev server;
they change no application behaviour and never relax authentication or TLS
checks.

## Boutique data

- **Catalogue**: `src/data/products.js` — 13 pieces, each with carat options, a
  metal list, GIA/IGI grades and an `art` key into the SVG registry.
- **Pricing**: `src/lib/pricing.js`. `computePrice()` derives every price from
  the base figure, the carat ratio and the metal; `SPOT` is a static gold
  reference used for the "value at spot" line. Replace `SPOT` to wire a live
  market feed.
- **Currency**: `src/lib/currency.js` reference rates; the switcher in the top
  bar re-formats every price on the page.
- **Bag / wishlist / currency** persist in `localStorage` under
  `eclat.boutique.v1`.

Checkout is deliberately not connected: there is no payment provider in this
build, and the button reports that rather than pretending to charge.

## Deployment

The build is a static SPA (`npm run build` → `dist/`). Serve `dist/` from any
static host and configure an **SPA fallback** (rewrite unknown paths to
`index.html`) so deep routes such as `/product/solitaire-grace-ring` work on
refresh. No server runtime, database or environment variables are needed.
