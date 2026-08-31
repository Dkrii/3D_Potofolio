# Project Progress

## Phase Status

- [x] Phase 1 — Bootstrap
- [x] Phase 2 — GLB Integration
- [x] Phase 3 — Projects Interaction
- [x] Phase 4 — Remaining Sections
- [x] Phase 5 — Navigation
- [x] Phase 6 — UI & Responsive
- [x] Phase 7 — Performance
- [x] Phase 8 — Verification

## Current Phase

V1 complete

## Last Verified

- npm run lint: PASS
- npm run build: PASS
- dev-server HTTP check: PASS (HTTP 200)
- production output: JS 1,231.93 kB / 348.81 kB gzip; CSS 3.64 kB / 1.40 kB gzip
- automated test script: NOT AVAILABLE

## Completed Features

- Actual GLB node mapping and preserved hierarchy
- Shared hover, tooltip, highlight, click, camera, panel, and close flow
- About, Projects, Backend, AI/CV, Education, Achievement, and 3D/BMS sections
- Navbar fallback for About, Projects, Skills, Experience, and Contact
- Desktop/mobile panel, loading state, keyboard focus, reduced motion, and scene error fallback
- DPR limited to 1.5, demand rendering, selective shadow removal, and single GLB preload

## Regression Fixes

### 2026-08-21 — Overview camera and controls

- Re-inspected GLB: bounds `[-5.62, -4.00, -0.32]` to `[5.50, 4.12, 3.80]`, center `[-0.06, 0.06, 1.74]`, dimensions `11.12 × 8.12 × 4.12`; no camera node exists in the asset.
- Projects/workstation visual center confirmed at `[0, 0.515, 1.145]`.
- Overview camera changed to `[9.5, -15.5, 9.5]`, looking toward workstation-biased room center `[0, 0.35, 1.4]` from the open/front (`-Y`) side.
- Added Drei OrbitControls in overview with rotate, zoom, pan, damping `0.08`, distance `8–28`, and polar angle `0.16π–0.47π` to prevent underside rotation.
- Controls disable during GSAP transitions and section focus, then restore after returning to overview.
- npm run lint: PASS
- npm run build: PASS

## UI Redesign

### 2026-08-21 — BMS / Digital Twin dashboard

- Replaced floating portfolio navbar with fixed industrial dashboard shell: compact system header, left section navigation, central 3D workspace, right subsystem status rail, and bottom connection/status bar.
- Converted hover tooltips into node monitoring labels with node ID, capability, and operational status.
- Converted portfolio overlays into compact BMS detail panels with section ID, operational status, description, capabilities, and related projects.
- Preserved GLB, object interactions, camera transitions, OrbitControls, Zustand state, loading, and WebGL fallback.
- Added responsive behavior: right status rail collapses below 900px; navigation becomes horizontal and detail panel becomes a bounded bottom sheet below 640px.
- npm run lint: PASS
- npm run build: PASS
- production output: JS 1,252.28 kB / 354.59 kB gzip; CSS 9.49 kB / 2.76 kB gzip

## Camera Focus Fix

### 2026-08-21 — Per-section visual framing

- Recomputed world-space bounds from visible child meshes for all seven interactive groups; presets no longer rely on group origins.
- Added explicit manual position, visual-center target, and FOV for Overview, About, Projects, Backend, AI/CV, Education, Achievement, and 3D/BMS.
- Manual targets use measured bounding-box centers with small semantic offsets where needed to prioritize workstation screens or readable object height.
- Validated shot directions against scene geometry with ray casts: About, Projects, Backend, AI/CV, Achievement, and BMS first hit their intended mapped geometry; Education has an unobstructed path into the bookshelf volume.
- Preserved centralized GSAP camera transitions, dashboard shell, panels, hover interactions, and overview OrbitControls restoration.
- npm run lint: PASS
- npm run build: PASS

## Blockers

None

## Known Limitations

- Portfolio details, achievements, metrics, repository/demo links, and contact values remain explicit placeholders because source data is unavailable.
- Production JS chunk exceeds Vite's 500 kB warning threshold due to Three.js/R3F/GSAP; build succeeds.
- No automated browser interaction suite exists; verification covers lint, TypeScript production build, and dev-server HTTP smoke test.
