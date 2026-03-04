// =============================================================================
// Waste to Energy Website Configuration
// =============================================================================
// All site content is configured here. Components render nothing when their
// primary config fields are empty strings or empty arrays.
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "Waste to Energy - Ubah Sampah Jadi Energi Masa Depan",
  description:
    "Pelajari tentang teknologi Waste to Energy yang mengubah sampah menjadi energi bersih. Simulasi interaktif untuk memahami potensi energi dari sampah.",
  language: "id",
  keywords:
    "waste to energy, sampah, energi, lingkungan, renewable energy, WtE, Indonesia",
  ogImage: "/images/hero-bg.jpg",
  canonical: "",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "WtE",
  brandSubname: "Indonesia",
  tagline: "Energi untuk Masa Depan",
  navLinks: [
    { name: "Beranda", href: "#hero", icon: "Home" },
    { name: "Tentang", href: "#about", icon: "BookOpen" },
    { name: "Proses", href: "#process", icon: "Recycle" },
    { name: "Teknologi", href: "#technology", icon: "Zap" },
    { name: "Simulasi", href: "#simulator", icon: "BarChart" },
  ],
  ctaButtonText: "Mulai Simulasi",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "Waste to Energy",
  brandSubname: "Indonesia",
  yearText: "Energi Bersih",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "Solusi Berkelanjutan",
  mainTitle: "UBAH SAMPAH\nJADI ENERGI",
  ctaButtonText: "Jelajahi",
  ctaTarget: "#about",
  stats: [
    { value: 67, suffix: "jt Ton", label: "Sampah Tahunan" },
    { value: 500, suffix: "+", label: "Rumah Dialiri" },
    { value: 70, suffix: "%", label: "Pengurangan CO₂" },
  ],
  decorativeText: "WASTE TO ENERGY",
  backgroundImage: "/images/hero-bg.jpg",
};

// -----------------------------------------------------------------------------
// About Section Config
// -----------------------------------------------------------------------------
export interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AboutConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  bodyText: string;
  features: AboutFeature[];
  image: string;
  imageAlt: string;
}

export const aboutConfig: AboutConfig = {
  scriptText: "WtE itu apaan mas?",
  subtitle: "PENGERTIAN",
  mainTitle: "Waste to Energy",
  bodyText:
    "Waste to Energy (WtE) adalah proses mengubah sampah yang tidak dapat didaur ulang menjadi energi listrik atau panas. Ini adalah solusi inovatif untuk mengatasi masalah sampah sekaligus kebutuhan energi. Dengan teknologi ini, sampah yang selama ini menjadi masalah lingkungan dapat diubah menjadi sumber energi terbarukan yang berkelanjutan.",
  features: [
    {
      icon: "Trash2",
      title: "Mengurangi Volume Sampah",
      description: "Mengurangi 90% volume sampah yang masuk ke TPA",
    },
    {
      icon: "Zap",
      title: "Menghasilkan Energi Bersih",
      description: "Produksi listrik ramah lingkungan",
    },
    {
      icon: "RefreshCw",
      title: "Mendukung Ekonomi Sirkular",
      description: "Mengubah limbah menjadi sumber daya berharga",
    },
  ],
  image: "/images/about-facility.jpg",
  imageAlt: "Fasilitas Waste to Energy modern",
};

// -----------------------------------------------------------------------------
// Process Section Config
// -----------------------------------------------------------------------------
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ProcessConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  steps: ProcessStep[];
}

export const processConfig: ProcessConfig = {
  scriptText: "Bagaimana Cara Kerjanya?",
  subtitle: "PROSES",
  mainTitle: "Dari Sampah ke Energi",
  steps: [
    {
      id: 1,
      title: "Pemilahan Sampah",
      description:
        "Sampah dipilah berdasarkan jenisnya. Sampah organik, plastik, dan campuran dipisahkan untuk pengolahan yang optimal.",
      image: "/images/process-sorting.png",
    },
    {
      id: 2,
      title: "Pengolahan Awal",
      description:
        "Sampah dihancurkan dan dipisahkan menggunakan teknologi canggih untuk memaksimalkan efisiensi konversi energi.",
      image: "/images/process-processing.png",
    },
    {
      id: 3,
      title: "Konversi Energi",
      description:
        "Sampah diubah menjadi energi melalui pembakaran, gasifikasi, atau fermentasi anaerobik untuk menghasilkan listrik.",
      image: "/images/process-conversion.png",
    },
    {
      id: 4,
      title: "Distribusi Listrik",
      description:
        "Energi listrik yang dihasilkan didistribusikan ke jaringan listrik untuk melayani rumah-rumah dan industri.",
      image: "/images/process-distribution.png",
    },
  ],
};

// -----------------------------------------------------------------------------
// Technology Section Config
// -----------------------------------------------------------------------------
export interface Technology {
  id: string;
  name: string;
  description: string;
  image: string;
  efficiency: string;
  color: string;
  features: string[];
}

export interface TechnologyConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  technologies: Technology[];
}

export const technologyConfig: TechnologyConfig = {
  scriptText: "Teknologi Modern",
  subtitle: "TEKNOLOGI",
  mainTitle: "Metode Waste to Energy",
  technologies: [
    {
      id: "incineration",
      name: "Incineration",
      description:
        "Pembakaran sampah pada suhu tinggi (850-1200°C) untuk menghasilkan uap yang menggerakkan turbin pembangkit listrik.",
      image: "/images/tech-incineration.png",
      efficiency: "500-600 kWh/ton",
      color: "blue",
      features: [
        "Reduksi volume 90%",
        "Produksi listrik stabil",
        "Pengolahan limbah berbahaya",
      ],
    },
    {
      id: "biogas",
      name: "Biogas",
      description:
        "Fermentasi anaerobik sampah organik oleh bakteri untuk menghasilkan metana yang dapat dibakar untuk energi.",
      image: "/images/tech-biogas.png",
      efficiency: "200-400 kWh/ton",
      color: "green",
      features: [
        "Cocok untuk sampah organik",
        "Produksi pupuk organik",
        "Emisi karbon rendah",
      ],
    },
    {
      id: "rdf",
      name: "RDF",
      description:
        "Refuse Derived Fuel - sampah dikeringkan dan dipadatkan menjadi bahan bakar alternatif untuk industri.",
      image: "/images/tech-rdf.png",
      efficiency: "300-500 kWh/ton",
      color: "purple",
      features: [
        "Bahan bakar industri",
        "Pengganti batu bara",
        "Energi terbarukan",
      ],
    },
  ],
};

// -----------------------------------------------------------------------------
// Simulator Section Config
// -----------------------------------------------------------------------------
export interface SimulatorConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  wasteTypes: { value: string; label: string; efficiency: number }[];
  labels: {
    wasteType: string;
    weight: string;
    energyOutput: string;
    homesPowered: string;
    co2Reduction: string;
    calculateButton: string;
  };
}

export const simulatorConfig: SimulatorConfig = {
  scriptText: "Gass Cobainn",
  subtitle: "SIMULATOR",
  mainTitle: "Simulasi Energi dari Sampah",
  introText:
    "Masukkan jenis dan berat sampah untuk melihat estimasi energi yang dapat dihasilkan. Simulasi ini membantu memahami potensi Waste to Energy.",
  wasteTypes: [
    { value: "organik", label: "Sampah Organik", efficiency: 0.25 },
    { value: "plastik", label: "Sampah Plastik", efficiency: 0.6 },
    { value: "campuran", label: "Sampah Campuran", efficiency: 0.45 },
  ],
  labels: {
    wasteType: "Jenis Sampah",
    weight: "Berat Sampah (kg)",
    energyOutput: "Energi Listrik (kWh)",
    homesPowered: "Rumah Terlayani",
    co2Reduction: "Pengurangan CO₂ (kg)",
    calculateButton: "Hitung Energi",
  },
};

// -----------------------------------------------------------------------------
// Contact Form Config
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  subtext: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  visitDateLabel: string;
  visitorsLabel: string;
  visitorsOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactFormConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  contactInfoTitle: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: "Hubungi Kami",
  subtitle: "KONTAK",
  mainTitle: "Pelajari Lebih Lanjut",
  introText:
    "Tertarik dengan teknologi Waste to Energy? Hubungi kami untuk informasi lebih lanjut atau kunjungan ke fasilitas kami.",
  contactInfoTitle: "Informasi Kontak",
  contactInfo: [
    {
      icon: "MapPin",
      label: "Alamat",
      value: "MAN Salatiga, Indonesia",
      subtext: "CEO WtE Yang Ganteng nan Sigma",
    },
    {
      icon: "Mail",
      label: "Email",
      value: "dappskii57@gmail.com",
      subtext: "Respons dalam 24 jam, insyaAllah",
    },
    {
      icon: "Phone",
      label: "Telepon",
      value: "+62 89671285069",
      subtext: "Senin-Jumat, 08.00-17.00",
    },
  ],
  form: {
    nameLabel: "Nama Lengkap",
    namePlaceholder: "Masukkan nama Anda",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    phoneLabel: "Nomor Telepon",
    phonePlaceholder: "+62 xxx xxxx xxxx",
    visitDateLabel: "Tanggal Kunjungan",
    visitorsLabel: "Jumlah Pengunjung",
    visitorsOptions: ["1", "2", "3-5", "6-10", "10+"],
    messageLabel: "Pesan",
    messagePlaceholder: "Tulis pesan atau pertanyaan Anda...",
    submitText: "Kirim Pesan",
    submittingText: "Mengirim...",
    successMessage:
      "Pesan berhasil dikirim! Kami akan menghubungi Anda segera.",
    errorMessage: "Terjadi kesalahan. Silakan coba lagi.",
  },
  privacyNotice:
    "Dengan mengirimkan formulir ini, Anda menyetujui kebijakan privasi kami.",
  formEndpoint: "",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  newsletterEndpoint: string;
  copyrightText: string;
  legalLinks: string[];
  backToTopText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "WtE",
  tagline: "Indonesia",
  description:
    "Mengubah sampah menjadi energi bersih untuk masa depan yang berkelanjutan. Edukasi dan informasi tentang teknologi Waste to Energy.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "#" },
    { icon: "Facebook", label: "Facebook", href: "#" },
    { icon: "Twitter", label: "Twitter", href: "#" },
    { icon: "Youtube", label: "YouTube", href: "#" },
  ],
  linkGroups: [
    {
      title: "Navigasi",
      links: [
        { name: "Beranda", href: "#hero" },
        { name: "Tentang", href: "#about" },
        { name: "Proses", href: "#process" },
        { name: "Teknologi", href: "#technology" },
        { name: "Simulasi", href: "#simulator" },
      ],
    },
    {
      title: "Sumber Daya",
      links: [
        { name: "Panduan WtE", href: "#" },
        { name: "Statistik", href: "#" },
        { name: "Berita", href: "#" },
        { name: "FAQ", href: "#" },
      ],
    },
  ],
  contactItems: [
    { icon: "MapPin", text: "Salatiga, Indonesia" },
    { icon: "Mail", text: "dappskii57@wte-indonesia.id" },
    { icon: "Phone", text: "+62 896 7128 5069" },
  ],
  newsletterLabel: "Berlangganan WtE-ers",
  newsletterPlaceholder: "Masukkan email Anda",
  newsletterButtonText: "Langganan",
  newsletterSuccessText: "Terima kasih telah berlangganan!",
  newsletterErrorText: "Terjadi kesalahan. Silakan coba lagi.",
  newsletterEndpoint: "",
  copyrightText: "© 2024 Waste to Energy Indonesia. Hak Cipta Dilindungi.",
  legalLinks: ["Kebijakan Privasi", "Syarat Penggunaan"],
  backToTopText: "Kembali ke Atas",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Kembali ke atas",
};
