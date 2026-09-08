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
}

export interface MediaItem {
  type: 'video' | 'image'
  title: string
  subtitle: string
  src: string
  poster?: string
}

export interface ExperienceItem {
  role: string
  company: string
  period: string
  type: string
  highlights: string[]
}

export interface EducationItem {
  degree: string
  institution: string
  major: string
  status: string
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
  // Profile / About specific structures
  education?: EducationItem
  experience?: ExperienceItem[]
  competencies?: { category: string; skills: string[] }[]
}

export const portfolioContentI18n: Record<Language, Record<Exclude<PortfolioSection, 'overview'>, PortfolioContent>> = {
  id: {
    about: {
      eyebrow: 'Profil Profesional',
      title: 'Dikri Ali',
      description: 'Mahasiswa S1 Teknik Informatika di Universitas Nusa Putra dengan pengalaman industri nyata sebagai Fullstack Developer Intern di PT Akebono Brake Astra Indonesia selama 8 bulan. Memiliki ketertarikan mendalam dan keahlian praktis dalam rekayasa perangkat lunak skala enterprise, sistem computer vision industri, arsitektur AI RAG, serta visualisasi 3D grafis modern.',
      education: {
        degree: 'Sarjana Komputer (S1)',
        institution: 'Universitas Nusa Putra',
        major: 'Teknik Informatika',
        status: 'Mahasiswa Aktif',
      },
      experience: [
        {
          role: 'Fullstack Developer Intern',
          company: 'PT Akebono Brake Astra Indonesia',
          period: '8 Bulan (Internship)',
          type: 'Industrial / Manufacturing IT',
          highlights: [
            'Mengembangkan Dies Management System — platform pelacakan siklus hidup cetakan manufaktur end-to-end.',
            'Membangun alur validasi status ketat (Rak → Persiapan → Mesin → Perawatan) untuk mengeliminasi potensi human error dan kehilangan aset.',
            'Mengintegrasikan sistem pemindaian QR/Barcode mobile/web dan fitur otomatisasi jadwal perawatan preventif berbasis stroke counter mesin.',
            'Bekerja sama lintas divisi untuk menyelaraskan kebutuhan operasional pabrik dengan arsitektur backend PostgreSQL & Laravel.',
          ],
        },
      ],
      competencies: [
        {
          category: 'Backend & Enterprise Architecture',
          skills: ['Laravel (PHP)', 'FastAPI (Python)', 'PostgreSQL', 'RESTful API', 'System Modeling'],
        },
        {
          category: 'Artificial Intelligence & Vision',
          skills: ['YOLO (Object Detection)', 'PyTorch', 'OpenCV', 'ChromaDB (Vector DB)', 'RAG Architecture', 'SentenceTransformers'],
        },
        {
          category: 'Frontend & 3D Interactive Graphics',
          skills: ['TypeScript / JavaScript', 'React', 'Three.js / React Three Fiber', 'GSAP Animation', 'Tailwind CSS'],
        },
      ],
      tags: ['Fullstack Development', 'Laravel', 'FastAPI', 'Python', 'TypeScript', 'YOLO / Vision AI', 'ChromaDB RAG', 'React / Three.js', 'PostgreSQL'],
    },

    computerVision: {
      eyebrow: 'Applied AI & Industrial Safety Inspection',
      title: 'Deteksi Safety',
      description: 'Sistem pengawasan Computer Vision berbasis Web & FastAPI yang dikembangkan untuk secara otomatis mendeteksi kepatuhan penggunaan Alat Pelindung Diri (APD/PPE: Helmet, Person, Vest) pada lingkungan konstruksi dan manufaktur. Catatan: Proyek ini merupakan prototipe aktif dengan dataset dasar (3 kelas) yang sedang dalam tahap ekspansi dataset untuk meningkatkan variasi lingkungan.',
      media: [
        {
          type: 'video',
          title: 'Demo Deteksi APD',
          subtitle: 'Real-time YOLO Video & Stream Inference',
          src: '/showcase/computer-vision/demo.mp4',
          poster: '/showcase/computer-vision/detection-view.webp',
        },
        {
          type: 'image',
          title: 'Deteksi Lapangan & Kepatuhan K3',
          subtitle: 'Visualisasi Bounding Box (Helmet, Person, Vest)',
          src: '/showcase/computer-vision/detection-view.webp',
        },
        {
          type: 'image',
          title: 'Interface Deteksi & Logika Spasial',
          subtitle: 'Verifikasi Kepatuhan & Tracking APD Pekerja',
          src: '/showcase/computer-vision/detection-ui.webp',
        },
      ],
      metrics: [
        { label: 'Akurasi Checkpoint', value: '84.53% mAP@0.5' },
        { label: 'Throughput GPU (CUDA)', value: '140 - 280+ FPS' },
        { label: 'Arsitektur Ringkas', value: '2.5M Params (YOLO26n)' },
      ],
      workflow: [
        'Input Stream: Tangkap feed video / RTSP CCTV / webcam',
        'Pre-processing: Letterbox 640x640, RGB convert & normalisasi',
        'YOLO26n Engine: Ekstraksi fitur visual (C3k2 + C2PSA attention)',
        'Logika Spasial K3: Validasi relasi bounding box Helmet & Vest per pekerja',
        'Output Telemetri: Visualisasi box status patuh/pelanggaran & webhook log',
      ],
      items: [
        { title: 'Deteksi Ringkas Edge-Optimized', detail: 'Arsitektur ultra-ringkas (2,5M parameter, 5,8 GFLOPs) dengan latensi 3,5–7,0 ms pada GPU CUDA.' },
        { title: 'Logika Kepatuhan Spasial Otomatis', detail: 'Memvalidasi kepatuhan APD per individu dengan mencocokkan irisan koordinat helm dan rompi terhadap badan pekerja.' },
        { title: 'Presisi Tinggi Lingkungan Industri', detail: 'Mencapai 84,53% mAP@0.5 dan 80,55% precision untuk meminimalkan false positive di lapangan.' },
      ],
      tags: ['Python', 'FastAPI', 'YOLO26 (PyTorch)', 'OpenCV', 'Supervision', 'ONNX / TensorRT'],
    },

    bms: {
      eyebrow: '3D Project & Digital Twin',
      title: '3D Building Management System ',
      description: 'Proyek visualisasi 3D Digital Twin interaktif yang dikembangkan menggunakan Three.js untuk memantau kondisi telemetri gedung, status HVAC, sensor lingkungan, dan jaringan pengawasan CCTV secara per-lantai.',
      media: [
        {
          type: 'image',
          title: 'Tampilan Utama Digital Twin',
          subtitle: 'Visualisasi 3D Gedung Interaktif & Viewport Controls',
          src: '/showcase/bms/bms-overview.webp',
        },
        {
          type: 'image',
          title: 'Exploded Floor View',
          subtitle: 'Inspeksi Interior Per-Lantai dengan Animasi GSAP',
          src: '/showcase/bms/bms-exploded.webp',
        },
        {
          type: 'image',
          title: 'Telemetri Sensor & IoT Hub',
          subtitle: 'Pemantauan Suhu, Daya Listrik, dan Status Kamera CCTV',
          src: '/showcase/bms/bms-telemetry.webp',
        },
      ],
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
          poster: '/showcase/dies-management/dashboard.webp',
        },
        {
          type: 'image',
          title: 'Monitoring Dashboard',
          subtitle: 'Matriks 150-Slot Rak & Status Real-time',
          src: '/showcase/dies-management/dashboard.webp',
        },
        {
          type: 'image',
          title: 'Alur Visual & Master Lokasi',
          subtitle: 'Alur Rak → Persiapan → Mesin → Perawatan',
          src: '/showcase/dies-management/workflow.webp',
        },
      ],
      metrics: [
        { label: 'Akurasi Lokasi', value: '100% Zero-Loss' },
        { label: 'Efisiensi Waktu', value: '60% Lebih Cepat' },
        { label: 'Perawatan Dies', value: 'Preventive Auto' },
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
      title: 'Chatbot Sunda',
      description: 'Platform AI Chatbot interaktif yang menggunakan arsitektur Retrieval-Augmented Generation (RAG) untuk menjawab pertanyaan dan melestarikan pengetahuan bahasa serta kebudayaan Sunda (seperti 100+ Paribasa/Babasan terstruktur dan informasi daerah).',
      media: [
        {
          type: 'video',
          title: 'Demo Interaktif Chatbot',
          subtitle: 'Q&A Real-time & Dialog Kontekstual',
          src: '/showcase/chatbot-sunda/demo.mp4',
          poster: '/showcase/chatbot-sunda/chat-interface.webp',
        },
        {
          type: 'image',
          title: 'Interface Chat & Rekomendasi Paribasa',
          subtitle: 'Tampilan Respons Natural & Dialog Interaktif',
          src: '/showcase/chatbot-sunda/chat-interface.webp',
        },
        {
          type: 'image',
          title: 'Sintesis Pengetahuan & Penjelasan Budaya',
          subtitle: 'Visualisasi Jawaban Komprehensif Berbasis RAG',
          src: '/showcase/chatbot-sunda/rag-response.webp',
        },
      ],
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
      eyebrow: 'Professional Profile',
      title: 'Dikri Ali',
      description: 'Informatics Engineering undergraduate at Nusa Putra University with hands-on industrial experience as a Fullstack Developer Intern at PT Akebono Brake Astra Indonesia for 8 months. Passionate and skilled in enterprise software engineering, industrial computer vision systems, LLM RAG pipelines, and interactive 3D Web graphics.',
      education: {
        degree: 'Bachelor of Informatics Engineering (S.Kom)',
        institution: 'Nusa Putra University',
        major: 'Informatics Engineering',
        status: 'Active Student',
      },
      experience: [
        {
          role: 'Fullstack Developer Intern',
          company: 'PT Akebono Brake Astra Indonesia',
          period: '8 Months (Internship)',
          type: 'Industrial / Manufacturing IT',
          highlights: [
            'Architected and delivered the Dies Management System — an end-to-end tooling lifecycle and warehouse tracking platform.',
            'Engineered strict state-machine validation logic (Rack → Preparation → Machine → Maintenance) to eliminate asset loss and production downtime.',
            'Integrated mobile/web QR & barcode scanning along with automated preventive maintenance triggers powered by machine stroke counting.',
            'Collaborated closely across production and IT engineering divisions to align factory-floor workflows with PostgreSQL & Laravel backend architectures.',
          ],
        },
      ],
      competencies: [
        {
          category: 'Backend & Enterprise Architecture',
          skills: ['Laravel (PHP)', 'FastAPI (Python)', 'PostgreSQL', 'RESTful API', 'System Modeling'],
        },
        {
          category: 'Artificial Intelligence & Vision',
          skills: ['YOLO (Object Detection)', 'PyTorch', 'OpenCV', 'ChromaDB (Vector DB)', 'RAG Architecture', 'SentenceTransformers'],
        },
        {
          category: 'Frontend & 3D Interactive Graphics',
          skills: ['TypeScript / JavaScript', 'React', 'Three.js / React Three Fiber', 'GSAP Animation', 'Tailwind CSS'],
        },
      ],
      tags: ['Fullstack Development', 'Laravel', 'FastAPI', 'Python', 'TypeScript', 'YOLO / Vision AI', 'ChromaDB RAG', 'React / Three.js', 'PostgreSQL'],
    },

    computerVision: {
      eyebrow: 'Applied AI & Industrial Safety Inspection',
      title: 'Safety Detection',
      description: 'Web & FastAPI-based Computer Vision inspection system built to automatically enforce Personal Protective Equipment (PPE: Helmet, Person, Vest) compliance for construction and manufacturing workers. Note: This is an active prototype trained on a baseline 3-class dataset currently undergoing expansion for broader environmental generalization.',
      media: [
        {
          type: 'video',
          title: 'PPE Detection Demo',
          subtitle: 'Real-time YOLO Video & Stream Inference',
          src: '/showcase/computer-vision/demo.mp4',
          poster: '/showcase/computer-vision/detection-view.webp',
        },
        {
          type: 'image',
          title: 'Industrial Safety Compliance',
          subtitle: 'Spatial Bounding Box (Helmet, Person, Vest)',
          src: '/showcase/computer-vision/detection-view.webp',
        },
        {
          type: 'image',
          title: 'Detection UI & Spatial Logic',
          subtitle: 'Worker PPE Verification & Telemetry Output',
          src: '/showcase/computer-vision/detection-ui.webp',
        },
      ],
      metrics: [
        { label: 'Checkpoint Accuracy', value: '84.53% mAP@0.5' },
        { label: 'GPU Throughput (CUDA)', value: '140 - 280+ FPS' },
        { label: 'Compact Architecture', value: '2.5M Params (YOLO26n)' },
      ],
      workflow: [
        'Input Stream: Capture video feed / RTSP CCTV / webcam',
        'Pre-processing: 640x640 letterboxing, RGB conversion & normalization',
        'YOLO26n Inference: Feature extraction via C3k2 + C2PSA attention',
        'Spatial K3 Logic: Spatial matching of Helmet & Vest boxes per person',
        'Output Telemetry: Box compliance status visualization & webhook logs',
      ],
      items: [
        { title: 'Edge-Optimized Real-time Model', detail: 'Ultra-compact model (2.5M params, 5.8 GFLOPs) achieving 3.5–7.0 ms inference latency on CUDA GPUs.' },
        { title: 'Automated Spatial Compliance', detail: 'Per-worker compliance validation matching helmet and vest coordinate intersections against detected person geometry.' },
        { title: 'Industrial Grade Precision', detail: 'Achieved 84.53% mAP@0.5 and 80.55% precision to minimize false alarms in noisy site conditions.' },
      ],
      tags: ['Python', 'FastAPI', 'YOLO26 (PyTorch)', 'OpenCV', 'Supervision', 'ONNX / TensorRT'],
    },

    bms: {
      eyebrow: '3D Project & Digital Twin',
      title: '3D Building Management System',
      description: 'Interactive 3D Digital Twin visualization project built with Three.js to monitor building telemetry, HVAC status, ambient environmental sensors, and CCTV surveillance networks per floor.',
      media: [
        {
          type: 'image',
          title: 'Digital Twin Overview',
          subtitle: 'Interactive 3D Building & Viewport Controls',
          src: '/showcase/bms/bms-overview.webp',
        },
        {
          type: 'image',
          title: 'Exploded Floor View',
          subtitle: 'Per-Floor Interior Inspection with GSAP Animation',
          src: '/showcase/bms/bms-exploded.webp',
        },
        {
          type: 'image',
          title: 'IoT Sensor Telemetry',
          subtitle: 'HVAC Temperature, Power Load, and CCTV Node Status',
          src: '/showcase/bms/bms-telemetry.webp',
        },
      ],
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
          poster: '/showcase/dies-management/dashboard.webp',
        },
        {
          type: 'image',
          title: 'Monitoring Dashboard',
          subtitle: '150-Slot Rack Matrix & Live Status',
          src: '/showcase/dies-management/dashboard.webp',
        },
        {
          type: 'image',
          title: 'Visual Workflow & Locations',
          subtitle: 'Rack → Prep → Machine → Preventive Flow',
          src: '/showcase/dies-management/workflow.webp',
        },
      ],
      metrics: [
        { label: 'Tracking Accuracy', value: '100% Zero-Loss' },
        { label: 'Search Speed', value: '60% Faster' },
        { label: 'Maintenance', value: 'Auto Preventive' },
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
      title: 'Chatbot Sunda ',
      description: 'Interactive AI Chatbot platform utilizing Retrieval-Augmented Generation (RAG) architecture to answer questions and preserve Sundanese language and cultural heritage (including 113+ structured Paribasa/proverbs and regional knowledge).',
      media: [
        {
          type: 'video',
          title: 'Interactive Chatbot Demo',
          subtitle: 'Real-time Q&A & Contextual Dialogue',
          src: '/showcase/chatbot-sunda/demo.mp4',
          poster: '/showcase/chatbot-sunda/chat-interface.webp',
        },
        {
          type: 'image',
          title: 'Chat Interface & Proverb Recommendations',
          subtitle: 'Natural Response & Interactive Conversation',
          src: '/showcase/chatbot-sunda/chat-interface.webp',
        },
        {
          type: 'image',
          title: 'Knowledge Synthesis & Cultural Answers',
          subtitle: 'Comprehensive RAG-powered Insights',
          src: '/showcase/chatbot-sunda/rag-response.webp',
        },
      ],
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
