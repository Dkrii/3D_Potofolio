# Development Workflow

Implementasi berjalan bertahap. Selesaikan dan verifikasi setiap phase sebelum melanjutkan.

## Execution Policy

- Development phases adalah sequential checkpoints, bukan separate user requests.
- Saat suatu phase memenuhi exit criteria, lanjut otomatis ke phase berikutnya.
- Sebelum melanjutkan:
  - verifikasi phase yang selesai,
  - update `docs/progress.md`,
  - pertahankan seluruh working functionality yang sudah ada.
- Jangan meminta konfirmasi di antara phase normal.
- Jika phase berikutnya menyebabkan regression, fix regression sebelum melanjutkan.
- Berhenti hanya berdasarkan kondisi stop atau blocker dalam `docs/agent.md`.

## Phase 1 — Bootstrap

- Create React + TypeScript + Vite project.
- Install dependency minimum yang dibutuhkan.
- Copy GLB dari source ke lokasi publik project.
- Buat fullscreen app shell single-screen.

### Exit Criteria

- React + TypeScript + Vite development server dapat dijalankan.
- Fullscreen app shell memenuhi viewport tanpa overflow yang tidak disengaja.
- GLB tersedia di public asset directory dan source asli tidak berubah.
- Tidak ada blocking console atau runtime error pada app shell.
- Script lint dan build lulus jika sudah tersedia.

## Phase 2 — GLB Integration

- Load GLB.
- Inspect dan dokumentasikan hierarchy serta node names.
- Setup overview camera.
- Verify materials.
- Verify orientation dan scale.

### Exit Criteria

- GLB dimuat dari public asset directory dan terlihat utuh dalam scene.
- Hierarchy, node aktual, bounds, dan interactive mapping tercatat di `interaction-map.md`.
- Overview camera menampilkan kantor pada framing yang dapat digunakan.
- Scale, position, orientation, materials, lighting, dan background tampil benar.
- Tidak ada blocking asset-loading, console, WebGL, atau runtime error.
- Lint, build, dan dev-server HTTP check lulus.

**Gate:** jangan lanjut jika GLB belum dimuat dengan benar, hierarchy belum dipahami, material bermasalah, atau overview camera belum stabil.

## Phase 3 — Projects Interaction

Implementasikan **Projects terlebih dahulu** sebagai vertical slice:

```text
workstation
→ hover
→ tooltip
→ click
→ camera transition
→ Projects panel
→ close
→ overview
```

Setelah alur stabil dan terverifikasi, ekstrak pattern reusable untuk section lain. Jangan membuat abstraction sebelum kebutuhan pattern terlihat dari implementasi Projects.

### Exit Criteria

- Node Projects memakai mapping aktual dari `interaction-map.md`.
- Hover menampilkan pointer cursor, subtle highlight, dan tooltip tanpa mengubah original material secara permanen.
- Click menetapkan Projects sebagai active section, menjalankan camera transition, dan membuka Projects panel.
- Close menutup panel dan mengembalikan camera ke overview.
- Alur dapat diulang tanpa state, camera, atau material rusak.
- Tidak ada blocking console atau runtime error.
- Lint dan build lulus.

## Phase 4 — Remaining Sections

Gunakan pattern yang sudah stabil untuk:

- About
- Backend
- AI/CV
- Education
- Achievement
- 3D/BMS

Contact dapat memakai UI 2D/navbar karena tidak ada mapping node wajib.

### Exit Criteria

- Setiap section memakai node mapping aktual dan shared interaction pattern.
- Hover, click, camera transition, panel open, dan return overview bekerja pada seluruh section yang memiliki node.
- Konten berasal dari data TypeScript; placeholder eksplisit dipakai untuk data yang belum tersedia.
- Tidak ada object tambahan yang dibuat clickable tanpa fungsi jelas.
- Tidak ada blocking console atau runtime error.
- Lint dan build lulus.

## Phase 5 — Navigation

- Tambahkan navbar fallback.
- Navbar menggunakan section state dan camera preset yang sama dengan object interaction.
- Pastikan semua konten penting dapat diakses tanpa interaksi 3D.

### Exit Criteria

- Navbar menyediakan About, Projects, Skills, Experience, dan Contact.
- Navigation action dan object interaction memakai shared section state serta camera controller yang sama.
- Seluruh konten penting dapat diakses tanpa memilih object 3D.
- Keyboard navigation dan visible focus bekerja pada seluruh navbar action.
- Tidak ada blocking console atau runtime error.
- Lint dan build lulus.

## Phase 6 — UI & Responsive

- Desktop panel.
- Mobile panel.
- Loading screen.
- Accessibility dasar.
- WebGL fallback.
- Reduced-motion behavior bila relevan.

### Exit Criteria

- Panel desktop dan mobile menampilkan konten tanpa clipping atau overflow yang menghalangi penggunaan.
- Loading screen memberi status yang dapat dipahami sampai scene siap.
- WebGL fallback mempertahankan navigation dan akses konten.
- Semantic controls, accessible labels, keyboard access, visible focus, kontras dasar, dan reduced motion bekerja.
- Layout usable pada desktop dan viewport mobile minimum 320px.
- Tidak ada blocking console atau runtime error.
- Lint dan build lulus.

## Phase 7 — Performance

- Batasi DPR pada kisaran 1–1.5.
- Gunakan lazy loading.
- Gunakan preload bila hasil pengukuran menunjukkan manfaat.
- Terapkan shadows secara selektif.
- Gunakan minimal post-processing.
- Prevent unnecessary React renders dan scene updates.
- Uji loading dan interaksi pada perangkat yang lebih lemah.

### Exit Criteria

- DPR dibatasi maksimum 1.5.
- Shadow dan render cost hanya digunakan pada object yang membutuhkan.
- Tidak ada post-processing atau dependency visual tanpa manfaat terukur.
- Asset-loading strategy tidak memblokir UI fallback dan tidak memuat asset utama berulang kali.
- Interaksi tetap responsif dan tidak menghasilkan render loop atau state update yang tidak perlu.
- Tidak ada blocking console atau runtime error.
- Lint dan build lulus; ukuran build dicatat di `progress.md`.

## Phase 8 — Verification

Jalankan:

```bash
npm run build
```

Jika tersedia:

```bash
npm run lint
npm test
```

Periksa Definition of Done di `PRD.md`, mapping aktual di `interaction-map.md`, responsive dasar, keyboard navigation, WebGL fallback, dan known limitations. Fix seluruh error sebelum menyatakan V1 selesai.

### Exit Criteria

- Seluruh Definition of Done V1 di `PRD.md` telah diverifikasi.
- Seluruh phase 1–8 ditandai selesai di `progress.md`.
- Production build, lint, dan test yang tersedia lulus.
- Dev server dapat dijalankan dan app melewati smoke test tanpa blocking console atau runtime error.
- Desktop, mobile dasar, keyboard navigation, loading, WebGL fallback, dan interaction flow telah diperiksa.
- Known limitations dicatat tanpa menyembunyikan blocker.
