import { Building2, Facebook, Mail, MessageCircle, Linkedin, Instagram, MapPin, Phone, ArrowRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useSiteData } from './hooks/useSiteData'

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com/YOUR_PAGE', label: 'Facebook', color: '#3b82f6' },
  { Icon: MessageCircle, href: 'https://wa.me/917970147690', label: 'WhatsApp', color: '#25D366' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/YOUR_PAGE', label: 'LinkedIn', color: '#0ea5e9' },
  { Icon: Instagram, href: 'https://instagram.com/YOUR_HANDLE', label: 'Instagram', color: '#ec4899' },
]

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/payment', label: 'Payment' },
  { path: '/contact', label: 'Contact' },
]

const linkHover = (color = '#fb923c') => ({
  onMouseEnter: e => { e.currentTarget.style.color = color },
  onMouseLeave: e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' },
})

export default function Footer() {
  const { settings, services } = useSiteData()
  const year = new Date().getFullYear()

  return (
    <footer style={{ position: 'relative', fontFamily: "'Outfit',sans-serif" }}>
      <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.4),transparent)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#030c18 0%,#020810 100%)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 0, left: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,0.04),transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: 0, right: '15%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle,rgba(30,60,120,0.06),transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '60px 24px 32px' }}>

        {/* CTA banner */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg,rgba(249,115,22,0.12),rgba(234,88,12,0.06))', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 24, padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 56, backdropFilter: 'blur(20px)' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#fb923c', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>Ready to build?</p>
            <h3 style={{ fontSize: 'clamp(18px,3vw,26px)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
              Let's bring your project<br />
              <span style={{ background: 'linear-gradient(90deg,#fb923c,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>to life today.</span>
            </h3>
          </div>
          <Link to="/contact"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 28px', borderRadius: 100, background: 'linear-gradient(135deg,#f97316,#ea580c)', color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 24px rgba(249,115,22,0.4)', transition: 'transform 0.2s, box-shadow 0.2s', flexShrink: 0 }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 24px rgba(249,115,22,0.4)' }}>
            Get Free Quote <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 40, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 0 20px rgba(249,115,22,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <Building2 size={18} color="#fff" />
                <img src="/logo.jpeg" alt="Logo" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
              </div>
              <div>
                <span style={{ display: 'block', fontWeight: 800, fontSize: 13, color: '#fff' }}>Apex Structure</span>
                <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#fb923c' }}>Design &amp; Analysis</span>
              </div>
            </Link>
            <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, marginBottom: 20, fontWeight: 300 }}>
              Precision engineering with global standards and local excellence.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { href: `mailto:${settings.email}`, Icon: Mail, text: settings.email },
                { href: `tel:${settings.phone_number}`, Icon: Phone, text: settings.phone_number },
              ].map(({ href, Icon, text }) => (
                <a key={href} href={href} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                  {...linkHover()}>
                  <Icon size={13} color="#f97316" /> {text}
                </a>
              ))}
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.25)', lineHeight: 1.6 }}>
                <MapPin size={13} color="#f97316" style={{ flexShrink: 0, marginTop: 2 }} /> {settings.address}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ paddingLeft: 56 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>Quick Links</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s, gap 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#fb923c'; e.currentTarget.style.gap = '10px' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.gap = '7px' }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>Our Services</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {(services.length > 0 ? services.slice(0, 8) : [
                'Architecture Planning', 'Structural Engineering', 'Industrial Building Design',
                'Interior Design', 'MEP Engineering', 'Steel Fabrication',
                'Pre-Engineered Buildings', 'Cost Estimation & Tender',
              ]).map(s => {
                const name = typeof s === 'string' ? s : s.name;
                return (
                  <li key={name} style={{ display: 'flex', alignItems: 'flex-start', gap: 7, fontSize: 12.5, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, cursor: 'default', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(249,115,22,0.5)', flexShrink: 0, marginTop: 6 }} />
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 800, color: '#fff', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 18 }}>Connect</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              {socialLinks.map(({ Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.25s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.borderColor = `${color}44`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = '' }}>
                  <Icon size={16} color="rgba(255,255,255,0.45)" />
                </a>
              ))}
            </div>
            <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.2)', lineHeight: 1.7 }}>
              © {year} Apex Structure Consultants.<br />All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.18)' }}>Designed &amp; built with precision · Apex Structure Consultants</p>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <a href="http://apexstructureconsultants.in/backend/admin.php" style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'rgba(255,255,255,0.15)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.15)'}>
              <Lock size={10} /> Admin Panel
            </a>
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="#" style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.2)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fb923c'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}>
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
