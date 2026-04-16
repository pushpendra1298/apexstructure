import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building2, Mail, Phone, ArrowRight, X } from 'lucide-react'

const navLinks = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'payment', label: 'Payment', path: '/payment' },
  { id: 'testimonials', label: 'Testimonials', path: '/testimonials' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <style>{`
        .nb-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 60;
          height: 36px;
          background: linear-gradient(90deg,#020810,#03111f,#020810);
          border-bottom: 1px solid rgba(249,115,22,0.12);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          font-size: 12px;
          color: rgba(255,255,255,0.45);
          font-family: 'Outfit', sans-serif;
          gap: 12px;
        }

        .nb-topbar a {
          color: rgba(255,255,255,0.45);
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 5px;
          min-width: 0;
          white-space: nowrap;
        }

        .nb-topbar a:hover {
          color: #fb923c;
        }

        .nb-topbar-center {
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #fb923c;
          flex-shrink: 0;
        }

        .nb-header {
          position: fixed;
          top: 36px;
          left: 0;
          right: 0;
          z-index: 60;
          height: 64px;
          transition: background 0.35s, box-shadow 0.35s, backdrop-filter 0.35s;
          font-family: 'Outfit', sans-serif;
        }

        .nb-header.scrolled {
          background: rgba(2,8,16,0.88);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow: 0 1px 0 rgba(249,115,22,0.15), 0 8px 40px rgba(0,0,0,0.6);
        }

        .nb-header:not(.scrolled) {
          background: rgba(2,8,16,0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .nb-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          gap: 16px;
        }

        .nb-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          min-width: 0;
          flex: 1;
        }

        .nb-logo-icon {
          width: 75px;
          height: 50px;
          border-radius: 20px;
          flex-shrink: 0;
          background: linear-gradient(135deg, #f97316, #ea580c);
          box-shadow: 0 0 24px rgba(249,115,22,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          transition: box-shadow 0.3s;
        }

        .nb-logo-icon::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.25), transparent 60%);
          border-radius: inherit;
        }

        .nb-logo:hover .nb-logo-icon {
          box-shadow: 0 0 32px rgba(249,115,22,0.7);
        }

        .nb-logo-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .nb-logo-name {
          font-size: 16px;
          font-weight: 800;
          color: #fff;
          letter-spacing: 0.02em;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .nb-logo-sub {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #fb923c;
          margin-top: 3px;
          white-space: nowrap;
        }

        .nb-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .nb-link {
          position: relative;
          padding: 8px 13px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }

        .nb-link:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.05);
        }

        .nb-link.active {
          color: #fb923c;
          background: rgba(249,115,22,0.08);
        }

        .nb-link.active::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 18px;
          height: 2px;
          border-radius: 99px;
          background: linear-gradient(90deg, #f97316, #fbbf24);
        }

        .nb-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 20px;
          border-radius: 100px;
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 18px rgba(249,115,22,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .nb-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: translateX(-100%);
          transition: transform 0.5s;
        }

        .nb-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(249,115,22,0.55);
        }

        .nb-cta:hover::before {
          transform: translateX(100%);
        }

        .nb-burger {
          display: none;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.8);
          border-radius: 12px;
          width: 42px;
          height: 42px;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .nb-burger:hover {
          background: rgba(249,115,22,0.12);
          color: #fb923c;
          border-color: rgba(249,115,22,0.25);
        }

        .nb-overlay {
          position: fixed;
          inset: 0;
          z-index: 55;
          background: rgba(2,8,16,0.97);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .nb-overlay.open {
          opacity: 1;
          pointer-events: all;
        }

        .nb-overlay-link {
          font-size: clamp(28px, 8vw, 44px);
          font-weight: 800;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          letter-spacing: -0.01em;
          padding: 8px 32px;
          border-radius: 16px;
          transition: color 0.2s, background 0.2s, transform 0.4s, opacity 0.4s;
          font-family: 'Outfit', sans-serif;
          transform: translateY(20px);
          opacity: 0;
        }

        .nb-overlay.open .nb-overlay-link {
          transform: translateY(0);
          opacity: 1;
        }

        .nb-overlay.open .nb-overlay-link:nth-child(1) { transition-delay: 0.05s; }
        .nb-overlay.open .nb-overlay-link:nth-child(2) { transition-delay: 0.10s; }
        .nb-overlay.open .nb-overlay-link:nth-child(3) { transition-delay: 0.15s; }
        .nb-overlay.open .nb-overlay-link:nth-child(4) { transition-delay: 0.20s; }
        .nb-overlay.open .nb-overlay-link:nth-child(5) { transition-delay: 0.25s; }
        .nb-overlay.open .nb-overlay-link:nth-child(6) { transition-delay: 0.30s; }
        .nb-overlay.open .nb-overlay-link:nth-child(7) { transition-delay: 0.35s; }

        .nb-overlay-link:hover,
        .nb-overlay-link.active {
          color: #fb923c;
          background: rgba(249,115,22,0.08);
        }

        .nb-overlay-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px;
          color: rgba(255,255,255,0.5);
          cursor: pointer;
          transition: all 0.2s;
        }

        .nb-overlay-close:hover {
          background: rgba(249,115,22,0.12);
          color: #fb923c;
          border-color: rgba(249,115,22,0.3);
        }

        .nb-overlay-contact {
          margin-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .nb-overlay-contact a {
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          font-size: 14px;
        }

        .nb-overlay-badge {
          margin-top: 32px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.2);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .nb-overlay-badge span {
          width: 30px;
          height: 1px;
          background: rgba(255,255,255,0.12);
        }

        .nb-mobile-only {
          display: none;
        }

        @media (max-width: 900px) {
          .nb-nav,
          .nb-cta-wrap {
            display: none !important;
          }

          .nb-burger {
            display: inline-flex;
          }
        }

        @media (max-width: 600px) {
          .nb-topbar {
            height: 32px;
            padding: 0 10px;
            justify-content: center;
            font-size: 10px;
          }

          .nb-topbar .nb-email-link,
          .nb-topbar-center,
          .nb-topbar .nb-phone-secondary {
            display: none;
          }

          .nb-topbar .nb-phone-primary {
            font-size: 11px;
            font-weight: 600;
            color: rgba(255,255,255,0.8);
          }

          .nb-header {
            top: 32px;
            height: 58px;
          }

          .nb-inner {
            padding: 0 12px;
            gap: 10px;
          }

          .nb-logo {
            gap: 9px;
          }

          .nb-logo-icon {
            width: 58px;
            height: 40px;
            border-radius: 14px;
          }

          .nb-logo-name {
            font-size: 13px;
          }

          .nb-logo-sub {
            font-size: 8.5px;
            letter-spacing: 0.1em;
            margin-top: 2px;
          }

          .nb-burger {
            width: 38px;
            height: 38px;
            border-radius: 10px;
          }

          .nb-overlay-link {
            font-size: clamp(24px, 8vw, 34px);
            padding: 8px 20px;
          }

          .nb-mobile-only {
            display: block;
          }
        }

        @media (max-width: 420px) {
          .nb-logo-name {
            font-size: 12px;
          }

          .nb-logo-sub {
            font-size: 8px;
          }

          .nb-logo-icon {
            width: 52px;
            height: 36px;
          }

          .nb-inner {
            padding: 0 10px;
          }
        }
      `}</style>

      <div className="nb-topbar">
        <a
          href="mailto:apexstructureconsultant@gmail.com"
          className="nb-email-link"
        >
          <Mail size={11} style={{ color: '#fb923c' }} />
          apexstructureconsultant@gmail.com
        </a>

        <span className="nb-topbar-center">|| SHREE JI ||</span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
          <a href="tel:+917970147690" className="nb-phone-primary">
            <Phone size={11} style={{ color: '#fb923c' }} />
            +91 79701 47690
          </a>
          <a href="tel:+917648845342" className="nb-phone-secondary">
            +91 76488 45342
          </a>
        </div>
      </div>

      <header className={`nb-header${scrolled ? ' scrolled' : ''}`}>
        <div className="nb-inner">
          <Link to="/" className="nb-logo" onClick={() => setMenuOpen(false)}>
            <div className="nb-logo-icon">
              <Building2 size={22} color="#fff" />
              <img
                src="/logo.jpeg"
                alt="Apex"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                }}
              />
            </div>

            <div className="nb-logo-text">
              <span className="nb-logo-name">
                Apex Structure Consultants <span style={{ color: '#fb923c' }}>.</span>
              </span>
              <span className="nb-logo-sub">Design &amp; Analysis</span>
            </div>
          </Link>

          <nav className="nb-nav">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nb-link${isActive(item.path) ? ' active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="nb-cta-wrap" style={{ display: 'flex' }}>
            <Link to="/contact" className="nb-cta">
              Get Quote <ArrowRight size={13} />
            </Link>
          </div>

          <button
            className="nb-burger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} /> : <Building2 size={18} style={{ display: 'none' }} />}
            {!menuOpen && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className={`nb-overlay${menuOpen ? ' open' : ''}`}>
        <button className="nb-overlay-close" onClick={() => setMenuOpen(false)}>
          <X size={18} />
        </button>

        {navLinks.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`nb-overlay-link${isActive(item.path) ? ' active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}

        <div className="nb-overlay-contact">
          <a href="tel:+917970147690" onClick={() => setMenuOpen(false)}>
            +91 79701 47690
          </a>
          <a href="tel:+917648845342" onClick={() => setMenuOpen(false)}>
            +91 76488 45342
          </a>
          <a href="mailto:apexstructureconsultant@gmail.com" onClick={() => setMenuOpen(false)}>
            apexstructureconsultant@gmail.com
          </a>
        </div>

        <div className="nb-overlay-badge">
          <span /> Apex Structure Consultants <span />
        </div>
      </div>
    </>
  )
}