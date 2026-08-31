# 3D Interactive Portfolio Website

## Ringkasan

3D Interactive Portfolio Website adalah portfolio single-screen berbentuk kantor developer 3D interaktif. Pengalaman utama menghubungkan objek di dalam kantor dengan informasi profesional Dikri Ali tanpa bergantung pada long-scrolling layout.

## Tujuan

Menampilkan positioning berikut secara recruiter-friendly:

> Software Engineer focused on Backend Development, System Integration, Computer Vision / AI Integration, and Interactive 3D Web Visualization.

Prioritas produk: **performance > usability > visual > gimmick**.

## Source Asset

Source GLB asli:

```text
C:\Users\USER\Documents\Magang\SCP 1\interactive_portfolio_office.glb
```

Saat implementasi, salin asset ke lokasi publik project, misalnya:

```text
public/models/interactive_portfolio_office.glb
```

Jangan mengubah source asli.

## Tech Stack Target

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Drei
- Zustand
- GSAP
- Framer Motion (opsional)

V1 tidak menggunakan backend.

## Dokumentasi

- [`README.md`](./README.md) — ringkasan dan indeks dokumentasi.
- [`PRD.md`](./PRD.md) — kebutuhan produk dan Definition of Done V1.
- [`architecture.md`](./architecture.md) — arsitektur aplikasi, state, data, dan kamera.
- [`agent.md`](./agent.md) — aturan utama AI coding agent.
- [`workflow.md`](./workflow.md) — urutan implementasi, exit criteria, dan kebijakan eksekusi otomatis.
- [`progress.md`](./progress.md) — state pengembangan persisten untuk menentukan phase berikutnya saat agent melanjutkan pekerjaan.
- [`interaction-map.md`](./interaction-map.md) — mapping node GLB ke section portfolio.
- [`conventions.md`](./conventions.md) — konvensi kode dan batas arsitektur.
- [`content.md`](./content.md) — source of truth konten portfolio awal.
- [`roadmap.md`](./roadmap.md) — scope V1, V1.1, dan V2.

## Cara AI Agent Menggunakan Folder `docs`

1. Baca `progress.md`, `agent.md`, `PRD.md`, dan `workflow.md` sebelum coding.
2. Gunakan `progress.md` sebagai state pengembangan persisten untuk menemukan phase pertama yang belum selesai dan melanjutkan pekerjaan tanpa prompt baru.
3. Gunakan `architecture.md` dan `conventions.md` saat membuat atau mengubah kode.
4. Inspect hierarchy GLB sebelum mengisi mapping aktual di `interaction-map.md`.
5. Ambil konten hanya dari `content.md`; gunakan placeholder eksplisit untuk data yang belum tersedia.
6. Gunakan `roadmap.md` untuk menjaga scope dan mencegah fitur V2 menghambat V1.
7. Setelah phase terverifikasi, perbarui `progress.md` lalu lanjut otomatis ke phase berikutnya.
8. Jika implementasi mengubah keputusan produk atau teknis, perbarui dokumen terkait dalam perubahan yang sama.
