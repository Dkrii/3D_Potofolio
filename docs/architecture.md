# Application Architecture

## Stack

```text
React
TypeScript
Vite
React Three Fiber
Three.js
Drei
Zustand
GSAP
```

Framer Motion bersifat opsional dan hanya digunakan jika animasi UI membutuhkannya. V1 tidak memiliki backend.

## Suggested Structure

```text
src/
├── components/
│   ├── navigation/
│   ├── panels/
│   └── ui/
├── scene/
│   ├── PortfolioScene.tsx
│   ├── PortfolioModel.tsx
│   ├── CameraController.tsx
│   ├── InteractiveObject.tsx
│   └── Environment.tsx
├── store/
│   └── portfolioStore.ts
├── data/
│   ├── projects.ts
│   ├── portfolio.ts
│   └── skills.ts
├── hooks/
├── App.tsx
└── main.tsx
```

Struktur dapat disesuaikan setelah workspace dan hierarchy GLB diperiksa, tetapi separation of concerns berikut wajib dipertahankan.

## Responsibilities

- `components/navigation/`: left sidebar navigation dan mobile navigation fallback.
- `components/panels/`: BMS-style detail panel desktop dan mobile.
- `components/ui/`: dashboard header/status chrome, monitoring node label, loading, dan WebGL fallback.
- `scene/PortfolioScene.tsx`: composition root scene.
- `scene/PortfolioModel.tsx`: loading dan render hierarchy GLB tanpa rebuild model.
- `scene/CameraController.tsx`: satu-satunya orchestration point untuk perpindahan camera preset.
- `scene/InteractiveObject.tsx`: perilaku hover/click reusable bagi node terpilih.
- `scene/Environment.tsx`: lighting, environment, dan shadow policy.
- `store/portfolioStore.ts`: shared interaction state minimal.
- `data/`: konten portfolio dan konfigurasi terpisah dari UI.

## State Management

Minimal Zustand state:

```text
activeSection
hoveredObject
isPanelOpen
isSceneReady
performanceMode
```

State lokal tetap digunakan untuk perilaku component yang tidak dibagi. Zustand hanya menyimpan state lintas navigation, scene, camera, dan panel.

## Camera Architecture

Camera wajib memiliki centralized controller. Object interaction dan navbar hanya meminta preset; keduanya tidak memanipulasi kamera secara langsung.

Preset awal:

```text
overview
about
projects
backend
ai
education
achievement
bms
```

Setiap preset menyimpan target camera position, look-at target, dan parameter transisi di satu source of truth. GSAP mengelola transisi dan harus menghormati reduced motion bila diterapkan.

## GLB Integration

- Source GLB disalin ke `public/models/interactive_portfolio_office.glb` tanpa mengubah file asli.
- Hierarchy dan nama node wajib di-inspect sebelum mapping dibuat.
- Hierarchy model dipertahankan.
- Mapping node interaktif memiliki satu source of truth.
- Hanya node relevan yang menerima interaction handler.
- Hover effect tidak memodifikasi original material secara permanen.

## Data Architecture

Semua portfolio content disimpan sebagai data TypeScript terpisah dari UI component. Component menerima data terstruktur dan tidak menyimpan fakta portfolio hardcoded. Data yang belum tersedia memakai placeholder eksplisit, bukan data rekaan.

## Rendering dan Fallback

- App shell memakai fixed dashboard grid: compact header, left navigation, central Canvas, right status rail, dan bottom status bar.
- Canvas 3D tetap menjadi workspace visual utama dan mengisi seluruh central grid area.
- UI HTML menjadi overlay/chrome terpisah dari scene; pada mobile sidebar berubah menjadi horizontal navigation dan right status rail disembunyikan.
- Navigation dan content panel tetap tersedia saat WebGL gagal.
- Loading state, scene-ready state, dan error/fallback state harus terpisah.
- Performance mode mengatur DPR, shadows, dan efek tanpa mengubah akses ke konten.
