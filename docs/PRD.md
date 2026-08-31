# Product Requirements Document

## Produk

**Nama:** 3D Interactive Portfolio Website  
**Pemilik portfolio:** Dikri Ali  
**Bentuk:** single-screen interactive 3D developer office  
**Prioritas:** performance > usability > visual > gimmick

## Tujuan Produk

Menyajikan portfolio Software Engineer yang berfokus pada Backend Development, System Integration, Computer Vision / AI Integration, dan Interactive 3D Web Visualization melalui pengalaman 3D yang cepat, jelas, dan mudah digunakan recruiter.

## Core Experience

```text
Open website
→ Loading screen
→ 3D office muncul
→ Hover object
→ Tooltip
→ Click object
→ Smooth camera transition
→ Portfolio panel
→ Close
→ Return overview
```

## Section Utama

- About
- Projects
- Backend / Skills
- AI / Computer Vision
- Education
- Achievements
- 3D / BMS
- Contact

## Navigasi

Interaksi objek 3D menjadi navigasi utama, tetapi bukan satu-satunya cara mengakses konten. Sediakan navbar fallback yang selalu jelas:

```text
About | Projects | Skills | Experience | Contact
```

Item navbar boleh mengelompokkan section terkait, tetapi harus memakai state dan camera preset yang sama dengan interaksi objek. Contact dapat dibuka melalui navbar atau UI 2D tanpa memerlukan node 3D khusus.

## Functional Requirements

1. Website menampilkan loading screen selama asset utama dipersiapkan.
2. Setelah siap, pengguna melihat overview kantor 3D.
3. Object interaktif terpilih memberi pointer cursor, subtle highlight, dan tooltip saat hover.
4. Klik object menetapkan active section, menjalankan smooth camera transition, lalu membuka panel informasi.
5. Menutup panel mengembalikan kamera ke overview.
6. Navbar dapat membuka section tanpa memerlukan interaksi 3D.
7. Konten portfolio berasal dari data TypeScript terpisah dari presentation component.
8. WebGL fallback tetap memberi akses ke navigasi dan konten portfolio.

## UX dan Platform Requirements

- Desktop-first.
- Mobile responsive dengan kontrol dan panel yang tetap usable.
- Recruiter-friendly: informasi cepat dipindai, navigasi jelas, dan gimmick tidak menghalangi konten.
- Loading screen memiliki status yang dapat dipahami.
- Accessibility dasar: semantic HTML, keyboard-accessible navigation, visible focus, label tombol, kontras layak, dan dukungan reduced motion bila relevan.
- 3D bukan satu-satunya navigasi.

## Performance Requirements

- Optimalkan ukuran dan pemuatan GLB.
- Batasi DPR sesuai kebutuhan perangkat.
- Gunakan shadow secara selektif.
- Hindari post-processing yang tidak diperlukan.
- Cegah render React dan scene update yang tidak perlu.
- Pertahankan interaksi responsif; efek visual tidak boleh mengorbankan usability.

## Non-Goals V1

- Backend atau CMS.
- Character animation.
- Sound effects.
- Easter eggs.
- Interaksi BMS tingkat lanjut.
- Pembuatan ulang asset kantor memakai Three.js primitives.

## Definition of Done V1

- [x] GLB berhasil dimuat.
- [x] Overview camera bekerja.
- [x] Interactive node mapping bekerja.
- [x] Hover tooltip bekerja.
- [x] Click interaction bekerja.
- [x] Smooth camera transition bekerja.
- [x] Panel informasi tersedia.
- [x] Navbar navigation bekerja.
- [x] Responsive dasar tersedia.
- [x] Build berhasil.
