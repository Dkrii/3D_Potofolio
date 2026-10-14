# 3D Interactive Isometric Portfolio — Dikri Ali

[![Live Demo](https://img.shields.io/badge/Live%20Demo-portofolio.dikri.workers.dev-blue?style=flat-square)](https://portofolio.dikri.workers.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat-square&logo=threedotjs)](https://threejs.org/)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-orange?style=flat-square&logo=cloudflare)](https://portofolio.dikri.workers.dev/)

Cyberpunk/HUD-inspired developer portfolio built as a fully interactive 3D isometric room. Click on objects in the room to navigate between portfolio sections. No page reloads.

## Live Demo

**[portofolio.dikri.workers.dev](https://portofolio.dikri.workers.dev/)**

## Features

- **Interactive 3D Room**: Isometric GLTF room model with raycasted hotspot tags on clickable objects. Each object links to a portfolio section.
- **Cinematic Camera System**: GSAP cubic-bezier (`power3.inOut`) camera transitions between focus zones, no jarring cuts.
- **Responsive across all devices**:
  - Desktop (1440px+): full HUD dashboard, 240px dock, wide media drawers, real-time lighting and camera inspector.
  - Tablet (768px–1366px): dynamic FOV compensation for portrait/landscape, compact dock, `100dvh` viewport support.
  - Mobile (<768px): lightweight performance mode, gesture-friendly carousel, touch-optimized modal.
- **WebGL Performance**:
  - Pre-warmed shader compilation (`gl.compile`) to prevent frame drops on load.
  - Adaptive DPR (1.0–1.5) based on device capability.
  - Canvas frameloop switches between `always` (3D navigation) and `demand` (detail view) to cut GPU usage.
  - Sub-50ms INP target.
- **Media Lightbox**: Autoplaying video showcases, screenshot viewer, non-destructive modal transitions, right-click asset protection.
- **Bilingual (EN/ID)**: Language toggle between English and Indonesian with zero layout shift.
- **Built-in Dev Tools**: In-memory camera presets editor and scene lighting controls, with direct Vite backend code persistence.

## Tech Stack

| Category | Libraries |
|---|---|
| Core | [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) |
| 3D / Graphics | [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Drei](https://github.com/pmndrs/drei) |
| Animation | [GSAP 3](https://greensock.com/gsap/) |
| State | [Zustand](https://github.com/pmndrs/zustand) |
| Icons | [Lucide React](https://lucide.dev/) |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) + [Wrangler](https://developers.cloudflare.com/workers/wrangler/) |

## Quick Start

**Prerequisites:** Node.js `v18+`, npm `v9+`

```bash
git clone https://github.com/Dkrii/3D_Potofolio.git
cd 3D_Potofolio
npm install
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

```bash
npm run build
```

Output goes to `dist/`.

## Project Architecture

```
3D_Portofolio/
├── public/
│   ├── showcase/             # Optimized compressed showcase videos & screenshots
│   ├── CV_Dikri_Ali.pdf      # Resume download asset
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── navigation/       # Header, responsive sidebar, and mobile drawer
│   │   ├── panels/           # Portfolio detail drawer and media lightbox
│   │   └── ui/               # HUD Chrome, Scene & Camera Dev Controls, Loading overlay
│   ├── data/
│   │   ├── cameraPresets.ts  # Desktop & Mobile camera coordinate sets
│   │   ├── interactiveMappings.ts # 3D mesh name mappings & hotspot tags
│   │   └── portfolio.ts      # Structured multilingual content (ID/EN)
│   ├── scene/
│   │   ├── CameraController.tsx # GSAP camera animator & aspect-ratio compensation
│   │   ├── PortfolioModel.tsx   # GLTF room loader, pointer events, and shader warm-up
│   │   └── PortfolioScene.tsx   # Canvas root, lighting, and shadow management
│   ├── store/
│   │   ├── cameraDevStore.ts # Viewport mode and camera preset state
│   │   └── portfolioStore.ts # Language, section, active part, and scene lighting store
│   ├── App.tsx               # Root layout orchestrator
│   ├── App.css               # Cyberpunk styling, neon scrollbars & responsive queries
│   └── main.tsx
├── vite.config.ts            # Vite bundler config & direct config saver plugin
└── wrangler.toml             # Cloudflare Pages deployment configuration
```

## Deployment (Cloudflare Pages)

```bash
git checkout dev
# ... commit changes ...
git push origin dev
```

Test on the Cloudflare preview URL, then merge to production:

```bash
git checkout main
git merge dev
git push origin main
```

## License

MIT © [Dikri Ali](https://github.com/Dkrii/3D_Potofolio)
