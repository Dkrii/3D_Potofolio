import type { BmsPart, PortfolioSection, Language } from '../store/portfolioStore'

export interface BmsPartDetail {
  id: BmsPart
  name: string
  zone: string
  sensors: { label: string; value: string; status: 'normal' | 'active' }[]
  cctvFeeds: { id: string; location: string; status: 'LIVE' | 'REC'; fps: number }[]
}

export const bmsPartDetails: Record<BmsPart, BmsPartDetail> = {
  1: {
    id: 1,
    name: 'Zone A - Main Atrium & HVAC',
    zone: 'Ground Floor & AHU-01',
    sensors: [
      { label: 'AHU Air Flow', value: '1,450 CFM', status: 'normal' },
      { label: 'Supply Temp', value: '18.5 °C', status: 'normal' },
      { label: 'Filter Differential', value: '120 Pa', status: 'normal' },
    ],
    cctvFeeds: [
      { id: 'CAM-01', location: 'Main Entrance Gate', status: 'LIVE', fps: 30 },
      { id: 'CAM-02', location: 'Atrium East Wing', status: 'LIVE', fps: 30 },
    ],
  },
  2: {
    id: 2,
    name: 'Zone B - Server & Network Core',
    zone: '2nd Floor Data Center',
    sensors: [
      { label: 'Rack Intake Avg', value: '21.2 °C', status: 'normal' },
      { label: 'Hot Aisle Exhaust', value: '31.8 °C', status: 'active' },
      { label: 'UPS Load Rate', value: '42.5 kW / 64%', status: 'normal' },
    ],
    cctvFeeds: [
      { id: 'CAM-03', location: 'Server Corridor A', status: 'REC', fps: 60 },
      { id: 'CAM-04', location: 'UPS Power Room', status: 'LIVE', fps: 30 },
    ],
  },
  3: {
    id: 3,
    name: 'Zone C - Innovation & Workspaces',
    zone: '3rd Floor Open Office',
    sensors: [
      { label: 'Ambient Temp', value: '23.4 °C', status: 'normal' },
      { label: 'Smart Lighting', value: 'Auto-Dim (65%)', status: 'normal' },
      { label: 'Active Desks', value: '24 / 30 Occupied', status: 'active' },
    ],
    cctvFeeds: [
      { id: 'CAM-05', location: 'Open Office Area', status: 'LIVE', fps: 30 },
      { id: 'CAM-06', location: 'Meeting Room 3A', status: 'LIVE', fps: 30 },
    ],
  },
  4: {
    id: 4,
    name: 'Zone D - Rooftop & Energy Hub',
    zone: 'Rooftop Solar Array',
    sensors: [
      { label: 'Solar Generation', value: '18.4 kW', status: 'active' },
      { label: 'Grid Feed In', value: '3.2 kW', status: 'normal' },
    ],
    cctvFeeds: [
      { id: 'CAM-07', location: 'Rooftop Array', status: 'LIVE', fps: 30 },
    ],
  },
}

export interface MediaItem {
  type: 'video' | 'image'
  title: string
  subtitle: string
  src: string
  poster?: string
}

export interface PortfolioContent {
  eyebrow: string
  title: string
  description: string
  media?: MediaItem[]
  metrics?: { label: string; value: string }[]
  workflow?: string[]
  items?: { title: string; detail: string }[]
  tags?: string[]
}

export const portfolioContentI18n: Record<Language, Record<Exclude<PortfolioSection, 'overview'>, PortfolioContent>> = {
  id: {
    about: {
      eyebrow: 'Tentang Developer',
      title: 'Dikri Ali',
      description: 'Software Engineer berpengalaman membangun sistem enterprise, pengawasan Computer Vision, RAG AI chatbot, serta visualisasi 3D Web interaktif. Berfokus pada arsitektur backend yang solid dan integrasi sistem end-to-end.',
      metrics: [
        { label: 'Keahlian Utama', value: 'Backend & Computer Vision' },
        { label: 'Fokus Riset', value: 'AI RAG & 3D Web Visualization' },
      ],
      tags: ['Laravel', 'FastAPI', 'Python', 'TypeScript', 'YOLO', 'ChromaDB', 'React / Three.js'],
    },

    computerVision: {
      eyebrow: 'Applied AI & Industrial Safety Inspection',
      title: 'Deteksi Safety (PPE Video & Live Stream Detection)',
      description: 'Sistem pengawasan Computer Vision berbasis Web & FastAPI yang dikembangkan untuk secara otomatis mendeteksi kepatuhan penggunaan Alat Pelindung Diri (APD/PPE) pekerja di area konstruksi dan manufaktur. Mampu mengolah input file video maupun live streaming camera dengan performa real-time.',
      metrics: [
        { label: 'Kecepatan Inferensi', value: '30+ FPS Real-time' },
        { label: 'Akurasi Deteksi', value: '94.2% mAP Score' },
        { label: 'Mode Pemrosesan', value: 'Accurate & Smooth' },
      ],
      workflow: [
        'Upload Video / Live RTSP Camera Stream',
        'Inferensi Jaringan Syaraf YOLO (Filter Confidence & IoU NMS)',
        'Mode Ganda (Accurate Tiap-Frame vs Smooth 2-Frame Skip)',
        'Rekodifikasi Video H.264 / Output Live Stream MJPEG',
        'Dashboard Telemetri Real-time (FPS, Latensi ms, & Pelanggaran APD)',
      ],
      items: [
        { title: 'Deteksi Multi-Class APD', detail: 'Mendeteksi Helm/Hardhat, Safety Vest, Masker, dan perlengkapan kerja secara presisi.' },
        { title: 'Dual Inference Engine', detail: 'Mode Accurate (tiap frame) & Mode Smooth (selang-seling frame dengan box tracking untuk efisiensi compute).' },
        { title: 'Live Stream & Ekspor Video', detail: 'Mendukung live preview via stream MJPEG serta ekspor video rekaman berformat H.264/MP4.' },
      ],
      tags: ['Python', 'FastAPI', 'YOLO (PyTorch)', 'OpenCV', 'MJPEG Streaming', 'imageio-ffmpeg'],
    },

    bms: {
      eyebrow: '3D Project & Digital Twin',
      title: '3D Building Management System (BMS)',
      description: 'Proyek visualisasi 3D Digital Twin interaktif yang dikembangkan menggunakan Three.js untuk memantau kondisi telemetri gedung, status HVAC, sensor lingkungan, dan jaringan pengawasan CCTV secara per-lantai.',
      metrics: [
        { label: 'Kecepatan Render WebGL', value: '60 FPS Smooth' },
        { label: 'Latensi Sinkronisasi', value: '< 100ms Sync' },
        { label: 'Zona Terpantau', value: '3 Lantai Utama Gedung' },
      ],
      workflow: [
        'Modeling Arsitektur 3D & Optimasi Aset (GLTF/GLB)',
        'Animasi Exploded Floor View Interaktif via GSAP',
        'Engine Telemetri IoT Real-time & Dynamic Data Binding',
        'Anotasi Ruang 3D & Preset Fokus Kamera Presisi',
      ],
      items: [
        { title: 'Animasi Exploded View Lantai', detail: 'Pemisahan lantai secara vertikal untuk melihat detail bagian dalam gedung.' },
        { title: 'Telemetri Sensor IoT', detail: 'Simulasi pemantauan real-time untuk suhu HVAC, konsumsi daya listrik (kW), CO2, dan okupansi.' },
        { title: 'Integrasi Kamera CCTV', detail: 'Pemetaan titik kamera pengawas lengkap dengan status live stream dan rekaman (FPS).' },
      ],
      tags: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP Animation', 'TypeScript', 'Zustand'],
    },

    website: {
      eyebrow: 'Enterprise Web Application (Astra Project)',
      title: 'Dies Management System',
      description: 'Sistem manajemen dan pelacakan siklus hidup cetakan manufaktur (Dies) berskala industri. Dikembangkan untuk memastikan akurasi lokasi penyimpanan Dies, mengontrol penggunaan di mesin produksi, serta mengotomatiskan jadwal perawatan pencegahan (Preventive Maintenance).',
      media: [
        {
          type: 'video',
          title: 'Video Demo',
          subtitle: 'Walkthrough Sistem Dies Management',
          src: '/showcase/dies-management/demo.mp4',
          poster: '/showcase/dies-management/dashboard.jpeg',
        },
        {
          type: 'image',
          title: 'Monitoring Dashboard',
          subtitle: 'Matriks 150-Slot Rak & Status Real-time',
          src: '/showcase/dies-management/dashboard.jpeg',
        },
        {
          type: 'image',
          title: 'Alur Visual & Master Lokasi',
          subtitle: 'Alur Rak → Persiapan → Mesin → Perawatan',
          src: '/showcase/dies-management/workflow.jpeg',
        },
      ],
      metrics: [
        { label: 'Akurasi Pelacakan', value: '100% Zero-Loss' },
        { label: 'Efisiensi Waktu Cari', value: '60% Lebih Cepat' },
        { label: 'Monitoring Stroke Mesin', value: 'Preventive Otomatis' },
      ],
      workflow: [
        'Scan IN Rak (Penyimpanan Dies di Rak)',
        'Scan OUT Rak → Persiapan (Persiapan Produksi)',
        'Scan IN Mesin → Produksi (Monitoring Stroke Mesin)',
        'Scan OUT Mesin → Perawatan (Inspeksi Preventive / Perbaikan)',
        'Perbaikan Selesai → Pengembalian ke Rak',
      ],
      items: [
        { title: 'Validasi Alur Kerja Ketat', detail: 'Mencegah loncat alur, memastikan 1 Dies hanya di 1 lokasi, dan validasi kelengkapan kombinasi komponen.' },
        { title: 'Penghitung Stroke & Notifikasi Perawatan', detail: 'Perhitungan otomatis stroke mesin untuk memicu peringatan perawatan sebelum terjadi cacat produk.' },
        { title: 'Dashboard Real-time & Ekspor Data', detail: 'Visualisasi posisi Dies di Rak vs Mesin secara live serta laporan riwayat (.CSV / .XLS).' },
      ],
      tags: ['Laravel', 'PostgreSQL', 'REST API', 'Web QR Scanner', 'Bootstrap', 'Chart.js'],
    },

    chatbot: {
      eyebrow: 'Generative AI & Cultural NLP Engine',
      title: 'Chatbot Sunda (Paribasa & Knowledge RAG)',
      description: 'Platform AI Chatbot interaktif yang menggunakan arsitektur Retrieval-Augmented Generation (RAG) untuk menjawab pertanyaan dan melestarikan pengetahuan bahasa serta kebudayaan Sunda (seperti 100+ Paribasa/Babasan terstruktur dan informasi daerah).',
      metrics: [
        { label: 'Latensi Respon', value: '< 750ms Response' },
        { label: 'Presisi Retrieval', value: '92% Precision' },
        { label: 'Basis Pengetahuan', value: '113+ Entri Paribasa' },
      ],
      workflow: [
        'Parsing Dokumen & Chunking Metadata (Paribasa, Arti, Kata Kunci)',
        'Penyimpanan Vektor Embedding di ChromaDB',
        'Hybrid Retrieval (Pencarian Vektor Semantik + Klasifikasi Niat)',
        'Pemeriksaan Cache Semantik (Respon instan & hemat token API)',
        'Sintesis Konteks & Pembuatan Respon Bahasa Sunda/Indonesia',
      ],
      items: [
        { title: '113+ Dataset Paribasa Terstruktur', detail: 'Dataset lengkap dengan arti Sunda, padanan bahasa Indonesia, tema, dan contoh kalimat modern.' },
        { title: 'Mesin Intent & Terjemahan Hibrida', detail: 'Mengenali maksud pengguna sekaligus mengolah terjemahan kontekstual yang luwes.' },
        { title: 'Caching Semantik Berperforma Tinggi', detail: 'Menyimpan riwayat pertanyaan serupa untuk respon instan dan efisiensi biaya LLM.' },
      ],
      tags: ['Python', 'FastAPI', 'ChromaDB', 'LlamaIndex / LangChain', 'Vue.js', 'SentenceTransformers'],
    },
  },

  en: {
    about: {
      eyebrow: 'About Developer',
      title: 'Dikri Ali',
      description: 'Software Engineer experienced in developing enterprise platforms, Computer Vision safety inspection, RAG AI chatbots, and interactive 3D Web visualization. Focused on robust backend architectures and end-to-end system integration.',
      metrics: [
        { label: 'Core Expertise', value: 'Backend & Computer Vision' },
        { label: 'Research Focus', value: 'AI RAG & 3D Web Visualization' },
      ],
      tags: ['Laravel', 'FastAPI', 'Python', 'TypeScript', 'YOLO', 'ChromaDB', 'React / Three.js'],
    },

    computerVision: {
      eyebrow: 'Applied AI & Industrial Safety Inspection',
      title: 'Safety Detection (PPE Video & Live Stream Detection)',
      description: 'Web & FastAPI-based Computer Vision inspection system built to automatically enforce Personal Protective Equipment (PPE) compliance for construction and manufacturing workers. Supports real-time video upload processing and live RTSP camera streams.',
      metrics: [
        { label: 'Inference Speed', value: '30+ FPS Real-time' },
        { label: 'Detection Accuracy', value: '94.2% mAP Score' },
        { label: 'Stream Modes', value: 'Accurate & Smooth' },
      ],
      workflow: [
        'Video Upload / Live RTSP Camera Stream Feed',
        'YOLO Neural Network Inference (Confidence & IoU NMS Filter)',
        'Dual Processing Mode (Accurate Frame-by-Frame vs Smooth 2-Frame Skip)',
        'H.264 Video Re-encoding / Live MJPEG Stream Output',
        'Real-time Telemetry Dashboard (FPS, Latency ms, & Violation Counter)',
      ],
      items: [
        { title: 'Multi-Class PPE Detection', detail: 'Accurately detects Helmets/Hardhats, Safety Vests, Masks, and other safety gear.' },
        { title: 'Dual Inference Engine', detail: 'Accurate Mode (full frame inference) & Smooth Mode (frame-skipping with box tracking for compute efficiency).' },
        { title: 'Live Stream & Video Export', detail: 'Supports live preview via MJPEG streaming and detected video export in H.264/MP4 format.' },
      ],
      tags: ['Python', 'FastAPI', 'YOLO (PyTorch)', 'OpenCV', 'MJPEG Streaming', 'imageio-ffmpeg'],
    },

    bms: {
      eyebrow: '3D Project & Digital Twin',
      title: '3D Building Management System (BMS)',
      description: 'Interactive 3D Digital Twin visualization project built with Three.js to monitor building telemetry, HVAC status, ambient environmental sensors, and CCTV surveillance networks per floor.',
      metrics: [
        { label: 'WebGL Render Speed', value: '60 FPS Smooth' },
        { label: 'Telemetry Latency', value: '< 100ms Sync' },
        { label: 'Monitored Zones', value: '3 Major Building Floors' },
      ],
      workflow: [
        '3D Architectural Modeling & Asset Optimization (GLTF/GLB)',
        'Interactive Exploded Floor View Animation via GSAP',
        'Real-time IoT Telemetry Engine & Dynamic Data Binding',
        '3D Spatial Annotations & Interactive Camera Focus Presets',
      ],
      items: [
        { title: 'Exploded Floor Animation', detail: 'Vertical floor separation mechanism for in-depth building interior inspection.' },
        { title: 'IoT Sensor Telemetry', detail: 'Simulated real-time tracking for HVAC temperature, power consumption (kW), CO2, and occupancy.' },
        { title: 'CCTV Surveillance Feeds', detail: 'Surveillance camera mapping with real-time status and live recording indicators (FPS).' },
      ],
      tags: ['Three.js', 'React Three Fiber', 'WebGL', 'GSAP Animation', 'TypeScript', 'Zustand'],
    },

    website: {
      eyebrow: 'Enterprise Web Application (Astra Project)',
      title: 'Dies Management System',
      description: 'Industrial-grade manufacturing Dies lifecycle management and tracking system. Built to guarantee die storage location accuracy, regulate machine allocation, and automate preventive maintenance schedules.',
      media: [
        {
          type: 'video',
          title: 'Demo Video',
          subtitle: 'Dies System Walkthrough',
          src: '/showcase/dies-management/demo.mp4',
          poster: '/showcase/dies-management/dashboard.jpeg',
        },
        {
          type: 'image',
          title: 'Monitoring Dashboard',
          subtitle: '150-Slot Rack Matrix & Live Status',
          src: '/showcase/dies-management/dashboard.jpeg',
        },
        {
          type: 'image',
          title: 'Visual Workflow & Locations',
          subtitle: 'Rack → Prep → Machine → Preventive Flow',
          src: '/showcase/dies-management/workflow.jpeg',
        },
      ],
      metrics: [
        { label: 'Tracking Accuracy', value: '100% Zero-Loss' },
        { label: 'Search Time Reduction', value: '60% Faster' },
        { label: 'Machine Stroke Monitoring', value: 'Automated Preventive' },
      ],
      workflow: [
        'Scan IN Rack (Dies Storage in Rack)',
        'Scan OUT Rack → Preparation (Pre-production Prep)',
        'Scan IN Machine → Production (Machine Stroke Monitoring)',
        'Scan OUT Machine → Preventive (Maintenance & Repair)',
        'Repair / Replenishment → Return to Storage Rack',
      ],
      items: [
        { title: 'Strict Workflow Validation', detail: 'Prevents skipped stages, ensures 1 Die per 1 location, and validates component combinations.' },
        { title: 'Stroke Counter & Preventive Alerts', detail: 'Automatic stroke counting to trigger maintenance alerts before tooling degradation occurs.' },
        { title: 'Real-time Dashboard & Data Export', detail: 'Live Rack vs Machine location visualization and transaction history reports (.CSV / .XLS).' },
      ],
      tags: ['Laravel', 'PostgreSQL', 'REST API', 'Web QR Scanner', 'Bootstrap', 'Chart.js'],
    },

    chatbot: {
      eyebrow: 'Generative AI & Cultural NLP Engine',
      title: 'Chatbot Sunda (Paribasa & Knowledge RAG)',
      description: 'Interactive AI Chatbot platform utilizing Retrieval-Augmented Generation (RAG) architecture to answer questions and preserve Sundanese language and cultural heritage (including 113+ structured Paribasa/proverbs and regional knowledge).',
      metrics: [
        { label: 'Query Latency', value: '< 750ms Response' },
        { label: 'Retrieval Accuracy', value: '92% Precision' },
        { label: 'Knowledge Base', value: '113+ Paribasa Entries' },
      ],
      workflow: [
        'Document Parsing & Metadata Chunking (Proverb, Meaning, Keywords)',
        'Vector Embedding Generation & Storage in ChromaDB',
        'Hybrid Retrieval (Semantic Vector Search + Intent Classification)',
        'Semantic Cache Check (Accelerates repeated queries & saves API tokens)',
        'Context Synthesis & Sundanese-Indonesian Response Generation',
      ],
      items: [
        { title: '113+ Structured Paribasa Dataset', detail: 'Rich dataset with Sundanese definitions, Indonesian equivalents, themes, and modern sentence examples.' },
        { title: 'Hybrid Intent & Translation Engine', detail: 'Recognizes user intentions while delivering natural, contextual translations.' },
        { title: 'Semantic Caching & High Performance', detail: 'Caches semantically similar queries for instant responses and lower LLM inference costs.' },
      ],
      tags: ['Python', 'FastAPI', 'ChromaDB', 'LlamaIndex / LangChain', 'Vue.js', 'SentenceTransformers'],
    },
  },
}

// Backward compatibility helper
export const portfolioContent = portfolioContentI18n.id
