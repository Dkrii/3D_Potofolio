# 🌐 3D Interactive Isometric Portfolio — Dikri Ali

> An immersive, cyberpunk/HUD-inspired 3D WebGL developer portfolio built with **React 19**, **Three.js / React Three Fiber (R3F)**, **GSAP**, and **Tailwind-free high-performance CSS**.

---

## ✨ Features

- **🎮 Interactive 3D Room & Hotspot Navigation**: Full 3D isometric room model with interactive GLTF objects and raycasted floating HUD tags.
- **🎥 Smooth Cinema Camera Animations**: Custom GSAP cubic-bezier (`power3.inOut`) camera choreography transitioning seamlessly across portfolio focus zones.
- **📱 True Multi-Device Responsive Architecture**:
  - **Desktop (1440px - 4K)**: Full HUD dashboard, 240px dock, wide media drawers, real-time lighting & camera inspection tool.
  - **Tablet & iPad (768px - 1366px Portrait/Landscape)**: Dynamic aspect-ratio FOV compensation, compact vertical dock, collision-free hero positioning, `100dvh` viewport support.
  - **Mobile (< 768px)**: Optimized lightweight performance mode, gesture-friendly carousel, touch prevention, responsive modal view.
- **⚡ High-Performance WebGL Engine**:
  - Pre-warmed shader compilation (`gl.compile`) to eliminate runtime frame drops and long tasks.
  - Adaptive device-pixel ratio (DPR: 1.0 - 1.5).
  - Smart canvas frameloop (`always` during 3D navigation, throttled to `demand` during detail inspection).
  - Sub-50ms INP and lightweight GPU memory footprint.
- **🎬 Multimedia Showcase & Custom Lightbox**: Autoplaying responsive video showcases, screenshot viewer, non-destructive modal transitions, and right-click asset protection.
- **🌐 Bilingual Internationalization (i18n)**: Seamless English (EN) and Indonesian (ID) language toggle with zero layout shift.
- **🛠️ Integrated Developer Tools**: Built-in in-memory Camera Presets Editor & Scene Lighting controls with direct Vite backend code persistence.

---

## 🛠️ Tech Stack

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **3D / Graphics**: [Three.js](https://threejs.org/), [@react-three/fiber (R3F)](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation**: [GSAP 3](https://greensock.com/gsap/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting / Edge**: [Cloudflare Pages](https://pages.cloudflare.com/) / [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js `v18.0+`
- npm `v9.0+`

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Dkrii/3D_Potofolio.git

# Navigate into project directory
cd 3D_Potofolio

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Production artifacts will be generated in the `dist/` directory.

---

## 🧭 Project Architecture

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

---

## 🚢 Deployment (Cloudflare Pages)

### Merge & Deploy Workflow
1. Make changes on the development branch:
   ```bash
   git checkout dev
   # ... commit changes ...
   git push origin dev
   ```
2. Test on Cloudflare Preview deployment.
3. Merge into `main` to update production domain:
   ```bash
   git checkout main
   git merge dev
   git push origin main
   ```

---

## 📄 License

MIT © [Dikri Ali](https://github.com/Dkrii/3D_Potofolio)
