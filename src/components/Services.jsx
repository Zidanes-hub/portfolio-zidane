import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

// GANTI nomor WhatsApp di bawah dengan punyamu (awalan 62, tanpa "+" dan tanpa "0" depan)
const WA_NUMBER = '6281234567890';
const EMAIL = 'zidanesuryanugraha@gmail.com';

// Harga: USD untuk klien luar negeri, IDR untuk Indonesia (sudah disesuaikan, tidak overprice)
const SERVICES = [
  {
    id: 'web',
    icon: 'web',
    title: 'Website Fullstack',
    desc: 'Landing page, company profile, atau web app lengkap (React/Next + API). Responsif & SEO-friendly.',
    usd: 35,
    idr: 300000,
    features: ['Frontend + Backend', 'Responsif & Cepat', 'Revisi 2x gratis'],
    popular: true,
  },
  {
    id: 'iot',
    icon: 'memory',
    title: 'Desain IoT & PCB',
    desc: 'Rancang sistem embedded, skematik & PCB (KiCAD), hingga prototipe IoT yang terhubung ke cloud.',
    usd: 60,
    idr: 500000,
    features: ['Skematik + PCB', 'Firmware Arduino/ESP', 'Dokumentasi lengkap'],
    popular: false,
  },
  {
    id: 'sec',
    icon: 'security',
    title: 'Audit Network Security',
    desc: 'Cek kerentanan jaringan, hardening, & laporan pengamanan untuk rumah, kantor, atau UMKM.',
    usd: 45,
    idr: 400000,
    features: ['Vulnerability scan', 'Rekomendasi hardening', 'Laporan tertulis'],
    popular: false,
  },
  {
    id: 'ai',
    icon: 'smart_toy',
    title: 'AI & Otomasi (n8n)',
    desc: 'Bikin workflow otomasi, chatbot, atau integrasi AI ke bisnismu pakai n8n & Gemini API.',
    usd: 30,
    idr: 250000,
    features: ['Workflow n8n', 'Chatbot AI', 'Integrasi API'],
    popular: false,
  },
];

// Deteksi otomatis pengunjung dari Indonesia (tanpa butuh jaringan/IP API)
function detectIndonesia() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language || '';
    if (['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'].includes(tz)) return true;
    if (lang.toLowerCase().startsWith('id')) return true;
  } catch (e) {
    /* abaikan */
  }
  return false;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Services() {
  const manualRef = useRef(false);
  const [currency, setCurrency] = useState(() => (detectIndonesia() ? 'IDR' : 'USD'));

  // Refinements opsional via IP API (gagal/timeout tidak masalah karena default sudah dari timezone/locale)
  useEffect(() => {
    if (manualRef.current) return;
    fetch('https://ipapi.co/json/')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && d.country_code === 'ID') setCurrency('IDR');
      })
      .catch(() => {});
  }, []);

  const fmt = (s) =>
    currency === 'USD'
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(s.usd)
      : new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(s.idr);

  const waLink = (s) =>
    `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
      `Halo Kak Zidane 👋, saya tertarik dengan layanan "${s.title}". Boleh diskusi detailnya?`
    )}`;

  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title">Layanan & Harga</h2>
        <p className="services-sub fade-in">
          Harga otomatis menyesuaikan lokasimu. Pengunjung dari Indonesia melihat <strong>IDR</strong> (sudah
          disesuaikan, tidak overprice), sedangkan klien luar negeri melihat <strong>USD</strong>.
        </p>

        <div className="currency-toggle fade-in">
          <button
            className={currency === 'IDR' ? 'active' : ''}
            onClick={() => {
              manualRef.current = true;
              setCurrency('IDR');
            }}
          >
            Rp IDR
          </button>
          <button
            className={currency === 'USD' ? 'active' : ''}
            onClick={() => {
              manualRef.current = true;
              setCurrency('USD');
            }}
          >
            $ USD
          </button>
        </div>

        <motion.div
          className="services-grid"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {SERVICES.map((s) => (
            <motion.div key={s.id} variants={item}>
              <TiltCard className="service-card">
                {s.popular && <div className="popular-badge">Paling Laris</div>}
                <div className="service-icon">
                  <span className="material-icons-outlined">{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-price">
                  <span className="price-amount">{fmt(s)}</span>
                  <span className="price-period">/ proyek</span>
                </div>
                <ul className="service-features">
                  {s.features.map((f) => (
                    <li key={f}>
                      <span className="material-icons-outlined">check_circle</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(s)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary service-cta"
                >
                  Pesan Sekarang
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <p className="services-note fade-in">
          Butuh kombinasi atau paket custom? <a href={`mailto:${EMAIL}`}>Email</a> atau chat{' '}
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>{' '}
          → konsultasi gratis.
        </p>
      </div>
    </section>
  );
}
