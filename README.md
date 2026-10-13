# Aurora — 3D Website

An interactive 3D landing page. A distorted metallic orb, an orbiting knot and
drifting shards are rendered live in WebGL, and the whole scene answers the
cursor and the page scroll.

Built with **Vite + React + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**
(`three`, `@react-three/drei`). No pre-rendered video, no image assets.

## Stack

| Piece | Role |
| --- | --- |
| `vite` | dev server with instant HMR |
| `react` | page structure (`src/components/Hero.jsx`, `Features.jsx`, `Footer.jsx`, `Navbar.jsx`) |
| `@react-three/fiber` | React renderer for three.js — the scene in `src/components/Scene3D.jsx` |
| `@react-three/drei` | scene helpers: `Float`, `Grid`, `Stars`, `MeshDistortMaterial` |

## Run locally (Docker, recommended)

```sh
docker compose -f docker-compose.base44.yml up -d
```

Then open <http://localhost:3000>. The compose service uses a plain `node:22`
image with the repository bind-mounted, installs dependencies into a
`node_modules` volume on startup, and runs the Vite dev server — so source edits
are reflected immediately without an image rebuild.

## Run locally (without Docker)

Requires Node 20+.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # production bundle in dist/
```

## Environment variables

**None are required** — the app has no backend and talks to no external service.
There is no `.env` file to fill in.

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

## Project layout

```
index.html
vite.config.js            # dev-server bind address, port and sandbox overrides
docker-compose.base44.yml # dev environment for the Base44 sandbox
src/
  main.jsx                # React entry point
  App.jsx                 # composes the scene + page sections
  index.css               # design tokens and all styling
  components/
    Scene3D.jsx           # the WebGL canvas, lights and camera rig
    Navbar.jsx
    Hero.jsx
    Features.jsx
    Footer.jsx
```
