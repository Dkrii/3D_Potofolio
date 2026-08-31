# AI Coding Agent Rules

File ini adalah aturan utama untuk setiap AI coding agent yang mengerjakan project.

## Aturan Wajib

1. Inspect workspace sebelum coding: struktur, konfigurasi, dependency, script, dan konvensi yang sudah ada.
2. Inspect hierarchy GLB sebelum implementasi scene atau interaksi.
3. Jangan mengasumsikan nama node GLB.
4. Gunakan source GLB berikut:

   ```text
   C:\Users\USER\Documents\Magang\SCP 1\interactive_portfolio_office.glb
   ```

5. Salin GLB ke lokasi project yang sesuai, misalnya:

   ```text
   public/models/interactive_portfolio_office.glb
   ```

   Jangan memodifikasi atau memindahkan source asli.
6. Jangan rebuild model menggunakan Three.js primitives.
7. Preserve hierarchy GLB kecuali perubahan terukur diperlukan dan didokumentasikan.
8. Jangan membuat semua object clickable. Pilih node yang memiliki fungsi portfolio jelas.
9. Jangan membuat backend untuk V1.
10. Jangan mengarang achievement, metrics, GitHub URL, demo URL, email, LinkedIn, atau data portfolio lain.
11. Gunakan placeholder eksplisit seperti `[BELUM TERSEDIA]` jika data belum tersedia.
12. Jaga dependency seminimal mungkin. Gunakan stack yang sudah dipilih dan fitur native lebih dahulu.
13. Performance lebih penting daripada efek visual.
14. Implementasikan fitur secara incremental sesuai `workflow.md`.
15. Fix error sebelum lanjut ke milestone berikutnya.
16. Jalankan build sebelum menyatakan pekerjaan selesai.

## Urutan Membaca Dokumentasi

1. `progress.md`
2. `PRD.md`
3. `workflow.md`
4. `architecture.md`
5. `interaction-map.md`
6. `conventions.md`
7. `content.md`
8. `roadmap.md`

## Autonomous Phase Progression

- Pada awal setiap run, baca `docs/progress.md`.
- Verifikasi phase terakhir yang ditandai selesai terhadap working state dan hasil verifikasi tercatat.
- Tentukan phase pertama yang belum selesai.
- Lanjut otomatis dari phase tersebut sesuai `docs/workflow.md`.
- Setelah menyelesaikan suatu phase:
  1. jalankan verifikasi wajib phase tersebut,
  2. fix seluruh blocking error,
  3. update status, current phase, hasil verifikasi, dan blocker di `docs/progress.md`,
  4. lanjut otomatis ke phase berikutnya.
- Jangan berhenti hanya karena satu phase selesai.
- Jangan meminta konfirmasi di antara phase normal.

Agent hanya boleh berhenti jika:

- seluruh phase V1 selesai,
- genuine blocker memerlukan input user,
- asset atau informasi wajib tidak tersedia,
- kelanjutan memerlukan data user rekaan,
- atau platform/runtime limitation mencegah eksekusi lebih lanjut.

Jika blocked:

- catat blocker spesifik di `docs/progress.md`,
- pertahankan last working state,
- jelaskan secara tepat input, asset, akses, atau tindakan yang diperlukan untuk melanjutkan.

## Guardrails Implementasi

- Projects menjadi vertical slice interaksi pertama.
- Navbar dan object interaction memakai shared section state serta camera preset yang sama.
- Camera logic tidak boleh tersebar di object atau UI component.
- Konten dipisahkan dari presentation component.
- 3D tidak boleh menjadi satu-satunya akses ke konten.
- Jangan mengerjakan fitur V1.1 atau V2 sebelum V1 selesai.
- Jangan menambah visual effect tanpa manfaat yang lebih besar daripada biaya performanya.

## Verifikasi Wajib

Minimal jalankan:

```bash
npm run build
```

Jika script tersedia, jalankan juga:

```bash
npm run lint
npm test
```

Error harus diperbaiki sebelum milestone dinyatakan selesai. Jangan menyatakan command berhasil tanpa benar-benar menjalankannya.

## Format Final Report

Final report harus ringkas dan memuat:

- files utama yang dibuat atau diubah
- dependencies yang ditambah atau digunakan
- GLB mapping aktual
- fitur yang selesai
- hasil test/build
- command menjalankan project
- known limitations
