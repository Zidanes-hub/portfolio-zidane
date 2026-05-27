import { useState, useEffect, useRef } from 'react';
import './index.css';
import { SplitText } from './components/SplitText';
import { FuzzyOverlay } from './components/FuzzyOverlay';
import { Lanyard } from './components/Lanyard';
import { ScrollVelocity } from './components/ScrollVelocity';
import CountUp from './components/CountUp';
import { PillNav } from './components/PillNav';
import LightRays from './components/LightRays';
import VariableProximity from './components/VariableProximity';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const aboutContainerRef = useRef(null);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Intersection Observer for scroll animations (fade-in)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <nav className="navbar fade-in" style={{ padding: '16px 0', borderBottom: '1px solid var(--md-sys-color-outline-variant)', background: 'var(--md-sys-color-surface)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>Zidane.</div>

          <div className="desktop-nav" style={{ display: 'flex', justifyContent: 'center', flex: 1, margin: '0 24px' }}>
            <PillNav items={[
              { id: 'about', label: 'Tentang', href: '#about' },
              { id: 'experience', label: 'Pengalaman', href: '#experience' },
              { id: 'projects', label: 'Proyek', href: '#projects' },
              { id: 'skills', label: 'Keahlian', href: '#skills' },
              { id: 'certificates', label: 'Sertifikat', href: '#certificates' },
              { id: 'contact', label: 'Kontak', href: '#contact' }
            ]} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--md-sys-color-primary)',
                color: 'var(--md-sys-color-on-primary)',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              title="Toggle Dark/Light Mode"
            >
              <span className="material-icons-outlined" style={{ fontSize: '20px' }}>{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button 
          className="sidebar-close-btn" 
          onClick={() => setIsMenuOpen(false)}
          title="Tutup Menu"
        >
          <span className="material-icons-outlined">close</span>
        </button>
        <div className="mobile-nav-links">
          <a href="#about" onClick={() => setIsMenuOpen(false)}>Tentang</a>
          <a href="#experience" onClick={() => setIsMenuOpen(false)}>Pengalaman</a>
          <a href="#projects" onClick={() => setIsMenuOpen(false)}>Proyek</a>
          <a href="#skills" onClick={() => setIsMenuOpen(false)}>Keahlian</a>
          <a href="#certificates" onClick={() => setIsMenuOpen(false)}>Sertifikat</a>
          <a href="#contact" onClick={() => setIsMenuOpen(false)}>Kontak</a>
        </div>
      </div>
      {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)}></div>}

      <header className="hero" style={{ overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
        <FuzzyOverlay />

        {isDarkMode && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
            <LightRays
              raysOrigin="top-center"
              raysColor="#a8c7fa"
              lightSpread={1.2}
              rayLength={2.0}
              fadeDistance={1.2}
              mouseInfluence={0.15}
            />
          </div>
        )}

        <div className="container hero-content-wrapper" style={{ zIndex: 2, position: 'relative', width: '100%', height: '100%' }}>
          {/* Left Column: Text & Buttons */}
          <div className="hero-content fade-in" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div style={{ marginBottom: '12px', fontSize: '1.25rem', fontWeight: 400, color: 'var(--md-sys-color-on-surface-variant)', letterSpacing: '0.5px' }}>
              Hello, I'm <span style={{ fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>Zidane Surya Nugraha</span>
            </div>

            <h1 className="hero-title" style={{ textAlign: 'left', margin: '0 0 8px 0' }}>
              <SplitText className="text-huge text-solid" delay={0.2} stagger={0.1}>IoT & Embedded</SplitText>
              <br />
              <SplitText className="text-huge text-outline" delay={0.6} stagger={0.1}>& Full Stack Dev</SplitText>
            </h1>

            <div style={{ marginBottom: '16px', color: 'var(--md-sys-color-on-surface)', fontSize: '1.3rem', fontWeight: 500, letterSpacing: '1px' }}>
              Junior PLC Engineer
            </div>

            {/* Statistics Row */}
            <div className="hero-stats" style={{ display: 'flex', gap: '32px', marginBottom: '24px', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                  <CountUp from={0} to={12} duration={2} separator="," />+
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  Projects Completed
                </div>
              </div>

              <div className="stat-divider" style={{ width: '1px', height: '40px', backgroundColor: 'var(--md-sys-color-outline-variant)' }}></div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--md-sys-color-on-surface)' }}>
                  <CountUp from={0} to={24} duration={2.5} separator="," />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--md-sys-color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  LinkedIn Connections
                </div>
              </div>
            </div>

            <div className="hero-buttons" style={{ zIndex: 10, position: 'relative', justifyContent: 'flex-start', marginTop: '24px' }}>
              <a href="#contact" className="btn btn-primary">Hubungi Saya</a>
              <a href="#projects" className="btn btn-outlined">Lihat Proyek</a>
            </div>
            <p className="location-text" style={{ marginTop: '24px' }}>Based in Bandung, Indonesia.</p>
          </div>

          {/* Right Column: Profile Image */}
          <div className="hero-visual fade-in" style={{ position: 'relative', animationDelay: '1s', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="/image/New Profile.png"
              alt="Zidane Surya Nugraha"
              className="profile-img-transparent"
            />
          </div>
        </div>
      </header>

      {/* Marquee Section */}
      <div style={{
        width: '100%',
        padding: '32px 0',
        borderTop: '1px solid var(--md-sys-color-outline-variant)',
        borderBottom: '1px solid var(--md-sys-color-outline-variant)',
        backgroundColor: 'var(--md-sys-color-surface-container)',
        overflow: 'hidden'
      }}>
        <ScrollVelocity
          texts={['TECHNOLOGY SOLUTION ARCHITECT • IOT & EMBEDDED SYSTEM •', 'FULL STACK DEVELOPER • AGENTIC AI • PLC ENGINEER •']}
          velocity={50}
          className="scroll-velocity-text"
        />
      </div>

      <section id="about" className="section" ref={aboutContainerRef}>
        <div className="container">
          <h2 className="section-title">Tentang Saya</h2>
          <div className="about-card fade-in">
            <VariableProximity
              label="Saya adalah seorang Technology Solution Architect dengan tiga fokus utama: IoT & Embedded System, Full Stack Website & Agentic AI, dan Automation System Control (mencakup PLC & Sistem Kendali). Saya berspesialisasi dalam merancang arsitektur perangkat lunak end-to-end, mulai dari pengembangan aplikasi web berbasis AI cerdas (seperti Agentic Browser), hingga implementasi perangkat keras dan sistem otomasi terintegrasi."
              className="variable-proximity-demo"
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 1000, 'opsz' 40"
              containerRef={aboutContainerRef}
              radius={120}
              falloff="linear"
            />
          </div>
        </div>
      </section>

      <section id="experience" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Pengalaman Profesional</h2>
          <div className="timeline">
            <div className="education-item fade-in">
              <div className="edu-icon">
                <span className="material-icons-outlined">work</span>
              </div>
              <div className="edu-content">
                <h3>Research Student (Web Developer)</h3>
                <span className="edu-subtitle">Stas RG Laboratory, Fakultas Ilmu Terapan - Bandung | Nov 2025 - Sekarang</span>
                <ul className="activities">
                  <li>Mengembangkan sistem pemantauan berbasis web penuh untuk GreenHouse IoT.</li>
                  <li>Merancang dan mengimplementasikan dashboard front-end (React) untuk visualisasi data sensor real-time (suhu, kelembaban, intensitas cahaya).</li>
                  <li>Membangun API (Node.js/Express) untuk mengelola data ingestion dari perangkat IoT.</li>
                </ul>
              </div>
            </div>

            <div className="education-item fade-in">
              <div className="edu-icon">
                <span className="material-icons-outlined">class</span>
              </div>
              <div className="edu-content">
                <h3>Asisten Praktikum - Algoritma dan Pemrograman Lanjut</h3>
                <span className="edu-subtitle">Laboratorium Komputer, Fakultas Ilmu Terapan | Feb 2026 - Jun 2026</span>
                <ul className="activities">
                  <li>Membimbing mahasiswa dalam memahami konsep algoritma lanjutan dan struktur data kompleks.</li>
                  <li>Memberikan arahan teknis dan evaluasi pada implementasi program C++.</li>
                </ul>
              </div>
            </div>

            <div className="education-item fade-in">
              <div className="edu-icon">
                <span className="material-icons-outlined">class</span>
              </div>
              <div className="edu-content">
                <h3>Asisten Praktikum - Algoritma Dasar & Pemrograman</h3>
                <span className="edu-subtitle">Laboratorium Komputer, Fakultas Ilmu Terapan | Sep 2025 - Jan 2026</span>
                <ul className="activities">
                  <li>Membimbing mahasiswa baru dalam menyelesaikan modul praktikum (C++).</li>
                  <li>Memberikan bantuan teknis, live debugging, dan pengarahan konsep dasar logika pemrograman.</li>
                  <li>Mengembangkan keterampilan komunikasi untuk menerjemahkan logika pemrograman yang kompleks.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Proyek Unggulan</h2>
          <div className="projects-grid">
            <article className="project-card fade-in">
              <a href="https://github.com/Zidanes-hub/Simulation-Chatbot-AI-Interview-Job-IT-Support-.git" target="_blank" rel="noopener noreferrer" className="project-link">
                <div className="project-image">
                  <img src="/image/chatbot.png" alt="AI Interview Chatbot" />
                </div>
                <div className="project-content">
                  <div className="project-label">Web App & AI Integration</div>
                  <h3>AI Interview CHATBOT</h3>
                  <p>Aplikasi simulasi wawancara kerja (studi kasus IT Support) dengan persona AI "MajuBot". Fitur termasuk 10 pertanyaan terstruktur, logika penilaian internal, dan pengiriman email hasil otomatis.</p>
                  <div className="project-meta">
                    <span>Next.js</span>
                    <span>Gemini API</span>
                    <span>Zod</span>
                  </div>
                </div>
              </a>
            </article>

            <article className="project-card fade-in">
              <a href="https://github.com/Zidanes-hub/Smart_Schedule_Import.git" target="_blank" rel="noopener noreferrer" className="project-link">
                <div className="project-image">
                  <img src="/image/smart_schedule.png" alt="Smart Schedule Importer" />
                </div>
                <div className="project-content">
                  <div className="project-label">Productivity Tool</div>
                  <h3>Smart Schedule Importer</h3>
                  <p>Aplikasi web untuk mengubah gambar jadwal kuliah menjadi kalender importable (.ics). Menggunakan Gemini 2.5 Flash untuk ekstraksi data jadwal yang ketat ke format JSON.</p>
                  <div className="project-meta">
                    <span>React</span>
                    <span>Vite</span>
                    <span>Tailwind</span>
                  </div>
                </div>
              </a>
            </article>

            <article className="project-card fade-in">
              <a href="https://github.com/Zidanes-hub/Telkom-food-Hub.git" target="_blank" rel="noopener noreferrer" className="project-link">
                <div className="project-image">
                  <img src="/image/telkom_foodhub.jpg" alt="Telkom Foodhub" />
                </div>
                <div className="project-content">
                  <div className="project-label">Web Development</div>
                  <h3>Telkom Foodhub</h3>
                  <p>Pengembangan website terintegrasi untuk mendukung dan mempromosikan UMKM kuliner di sekitar Telkom University.</p>
                  <div className="project-meta">
                    <span>Full Stack</span>
                    <span>Web App</span>
                  </div>
                </div>
              </a>
            </article>

            <article className="project-card fade-in">
              <a href="#" target="_blank" rel="noopener noreferrer" className="project-link">
                <div className="project-image hover-reveal">
                  <img src="/image/design_3d.jpeg" alt="3D Design Smart Garage" className="img-front" />
                  <img src="/image/Mockup_real.jpeg" alt="Implementasi Lapangan Smart Garage" className="img-back" />
                </div>
                <div className="project-content">
                  <div className="project-label">Computer Vision & IoT</div>
                  <h3>Smart Garage System</h3>
                  <p>Sistem garasi otomatis pintar yang mengintegrasikan Computer Vision untuk mendeteksi dan mengenali plat nomor kendaraan.</p>
                  <div className="project-meta">
                    <span>Computer Vision</span>
                    <span>Python</span>
                    <span>IoT</span>
                  </div>
                </div>
              </a>
            </article>
          </div>
        </div>
      </section>

      <section id="skills" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Keahlian & Tools</h2>
          <div className="skills-grid">
            <div className="skill-category fade-in">
              <div className="icon-box blue">
                <span className="material-icons-outlined">code</span>
              </div>
              <h3>Web Development</h3>
              <div className="tags">
                <span>React</span>
                <span>Next.js</span>
                <span>TypeScript</span>
                <span>Node.js</span>
                <span>Tailwind CSS</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <div className="icon-box red">
                <span className="material-icons-outlined">psychology</span>
              </div>
              <h3>AI & Data</h3>
              <div className="tags">
                <span>Agentic AI</span>
                <span>Browser OS</span>
                <span>Prompt Engineering</span>
                <span>Gemini API</span>
                <span>Google Cloud</span>
                <span>n8n</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <div className="icon-box yellow">
                <span className="material-icons-outlined">settings_suggest</span>
              </div>
              <h3>Core Skills</h3>
              <div className="tags">
                <span>Software Architecture</span>
                <span>Problem Solving</span>
                <span>Workflow Automation</span>
              </div>
            </div>

            <div className="skill-category fade-in">
              <div className="icon-box" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                <span className="material-icons-outlined">security</span>
              </div>
              <h3>Security & Control</h3>
              <div className="tags">
                <span>Network Security</span>
                <span>Cryptography</span>
                <span>Penetration Testing</span>
                <span>PID Control</span>
                <span>PLC</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section">
        <div className="container">
          <h2 className="section-title">Pendidikan</h2>
          <div className="timeline">
            <div className="education-item fade-in">
              <div className="edu-icon">
                <span className="material-icons-outlined">school</span>
              </div>
              <div className="edu-content">
                <h3>Telkom University</h3>
                <span className="edu-subtitle">D3 Teknologi Komputer | 2024 - 2027 (Diharapkan)</span>
                <p className="focus">Mahasiswa Semester 4 Aktif. Fokus: IoT, Embedded System, Network Admin, Web Programming.</p>
                <div className="project-label" style={{ marginTop: '16px' }}>Pengalaman Panitia</div>
                <ul className="activities">
                  <li>Panitia PKKMB Fakultas Ilmu Terapan 2025 - Divisi LO (Sep 2025)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certificates" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Sertifikat & Bootcamp</h2>
          <div className="cert-grid fade-in">
            <ul className="cert-list">
              <li>CCNA Routing and Switching</li>
              <li>Network and Automation Course (On-going)</li>
              <li>Gemini for Data Scientists and Analysts (Google Cloud, Nov 2025)</li>
              <li>Basic AI Certificate (Dicoding Indonesia, Nov 2025)</li>
              <li>AI x Softdev 2025 Bootcamp (GDG Telkom Univ, Aug-Sep 2025)</li>
              <li>Basic Project Management Certificate (Juli 2025)</li>
              <li>Python Programming Certificate (Jan 2025)</li>
              <li>Data Visualization Certificate (Nov 2024)</li>
            </ul>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="container">
          <div className="footer-content fade-in">
            <h2>Mari Terhubung</h2>
            <p>Jangan ragu untuk menghubungi saya untuk kolaborasi atau sekadar menyapa.</p>
            <div className="social-links-row">
              <a href="mailto:zidanesuryanugraha@gmail.com" className="social-btn gmail" title="Email Saya">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path fill="#EA4335" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                </svg>
                <span>Email</span>
              </a>
              <a href="https://www.linkedin.com/in/zidane-surya-nugraha-55550333a/" className="social-btn linkedin" title="LinkedIn">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path fill="#0077b5" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/Zidanes-hub" className="social-btn github" title="GitHub">
                <svg viewBox="0 0 24 24" className="social-icon">
                  <path fill="var(--md-sys-color-on-surface)" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.763-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                <span>GitHub</span>
              </a>
            </div>
            <div className="copyright">
              &copy; 2026 Zidane Surya Nugraha. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
