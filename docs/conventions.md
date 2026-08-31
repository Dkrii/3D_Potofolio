# Code Conventions

## Naming

React components menggunakan `PascalCase`:

```text
PortfolioScene
CameraController
ProjectsPanel
```

Hooks menggunakan `useXxx`:

```text
usePortfolioStore
useReducedMotion
```

Data files menggunakan `camelCase`:

```text
projects.ts
portfolio.ts
skills.ts
```

## Portfolio Section Type

```ts
type PortfolioSection =
  | "overview"
  | "about"
  | "projects"
  | "backend"
  | "ai"
  | "education"
  | "achievement"
  | "bms";
```

Contact dapat menjadi UI route/action terpisah atau ditambahkan ke type bila implementasi shared state membutuhkannya. Perubahan type harus konsisten di navigation, panel, data, dan camera behavior; Contact tidak memerlukan camera preset atau node 3D.

## Rules

- Pisahkan data dan presentation.
- Hindari prop drilling; gunakan composition atau shared state hanya saat data benar-benar lintas fitur.
- Global state hanya untuk shared state.
- Camera logic tidak boleh tersebar; semua transisi melalui centralized controller.
- GLB node mapping memiliki satu source of truth.
- Hindari `any`; gunakan type eksplisit atau `unknown` dengan narrowing di trust boundary.
- Jangan memodifikasi original material secara permanen hanya untuk hover.
- Jangan hardcode konten portfolio di presentation component.
- Jangan membuat semua object GLB clickable.
- Jangan menambah dependency jika platform, stack yang sudah ada, atau kode kecil yang jelas sudah cukup.

## Component Boundaries

- Scene component mengurus rendering 3D, bukan isi portfolio.
- Panel component mengurus presentation, bukan manipulasi kamera langsung.
- Navigation mengubah section intent, bukan Three.js object.
- Store menghubungkan navigation, scene, camera, dan panel melalui state minimal.
- Data module menjadi source of truth fakta portfolio.

## Interaction dan Accessibility

- Interactive HTML memakai semantic element yang benar.
- Action harus dapat diakses keyboard.
- Focus state harus terlihat.
- Icon-only control wajib memiliki accessible label.
- Animasi harus mempertimbangkan reduced motion.
- WebGL fallback mempertahankan akses ke content dan navigation.

## Performance

- Hindari allocation dan state update pada setiap frame jika tidak diperlukan.
- Hindari rerender seluruh scene akibat perubahan panel UI.
- Gunakan shadows dan post-processing secara selektif.
- Ukur sebelum menambah optimasi kompleks.
