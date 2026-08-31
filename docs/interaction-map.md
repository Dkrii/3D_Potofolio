# Interaction Map

## Status

Hierarchy GLB telah di-inspect langsung pada source asset selama Phase 2. Asset berisi 283 object, 265 mesh, 18 empty, dan 29 material setelah import. Bounds dunia adalah `[-5.62, -4.00, -0.32]` sampai `[5.50, 4.12, 3.80]`, dengan dimensi sekitar `11.12 × 8.12 × 4.12` dan center `[-0.06, 0.06, 1.74]`.

Nama logical marker tersedia, tetapi import menghasilkan pasangan marker base dan `.001` pada seluruh section. Beberapa marker base kosong, sedangkan geometry lengkap berada di marker `.001`; mapping harus mencakup group aktual yang memiliki child mesh.

Source GLB:

```text
C:\Users\USER\Documents\Magang\SCP 1\interactive_portfolio_office.glb
```

## Expected Logical Mapping

```text
INTERACTIVE_ABOUT
→ About / Avatar

INTERACTIVE_PROJECTS
→ Desk / Laptop

INTERACTIVE_BACKEND
→ Server Rack

INTERACTIVE_AI_CV
→ CCTV

INTERACTIVE_EDUCATION
→ Bookshelf

INTERACTIVE_ACHIEVEMENT
→ Trophy Shelf

INTERACTIVE_3D_BMS
→ Mini Building
```

## Mapping Aktual

| Logical ID | Section | Actual Node / Path | Status | Notes |
|---|---|---|---|---|
| `INTERACTIVE_ABOUT` | About | `INTERACTIVE_ABOUT` + `INTERACTIVE_ABOUT.001` | Confirmed | Masing-masing 7 child; avatar dan card geometry terbagi dalam dua set hasil import. |
| `INTERACTIVE_PROJECTS` | Projects | `INTERACTIVE_PROJECTS.001` | Confirmed | 28 child: desk, chair, laptop, monitor, keyboard, mouse, lamp, notebook, mug. Marker base `INTERACTIVE_PROJECTS` kosong. |
| `INTERACTIVE_BACKEND` | Backend / Skills | `INTERACTIVE_BACKEND.001` | Confirmed | 33 child: `ServerRack`, 8 server unit, dan 24 LED. Marker base kosong. |
| `INTERACTIVE_AI_CV` | AI / Computer Vision | `INTERACTIVE_AI_CV.001` | Confirmed | 3 child: `CCTV`, `CCTVBracket`, `CCTVLens`. Marker base kosong. |
| `INTERACTIVE_EDUCATION` | Education | `INTERACTIVE_EDUCATION.001` | Confirmed | 33 child: bookshelf, books, pot, dan plant meshes. Marker base kosong. |
| `INTERACTIVE_ACHIEVEMENT` | Achievements | `INTERACTIVE_ACHIEVEMENT` + `INTERACTIVE_ACHIEVEMENT.001` | Confirmed | Base memiliki 2 trophy child; `.001` memiliki shelf dan 8 trophy meshes. Konten belum final. |
| `INTERACTIVE_3D_BMS` | 3D / BMS | `INTERACTIVE_3D_BMS` + `INTERACTIVE_3D_BMS.001` | Confirmed | Base memiliki 33 facade/window child; `.001` memiliki 66 readable building, facade, platform, dan LED child. |

Contact tidak memerlukan node 3D khusus dan harus tetap dapat diakses melalui navbar/UI 2D.

## Interaction Contract

### Hover

```text
cursor pointer
subtle highlight
tooltip
```

Highlight tidak boleh memodifikasi original material secara permanen.

### Click

```text
set active section
camera transition
open panel
```

Camera transition harus diminta melalui centralized camera controller.

### Close

```text
close panel
return overview
```

## Mapping Rules

- Satu source of truth menghubungkan logical ID, actual node, section, tooltip, dan camera preset.
- Hanya object yang relevan dijadikan interactive.
- Jika node target terdiri dari beberapa child mesh, mapping harus mempertahankan hierarchy dan menghindari handler duplikat.
- Jika expected object tidak ada, dokumentasikan alternatif aktual; jangan mengarang node.
- Navbar memakai section dan preset yang sama, tanpa bergantung pada node GLB.
