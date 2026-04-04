import { Building2, Facebook, Mail, Linkedin, Instagram, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

// ── Add your profile links here ──────────────────────────────────
const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com/YOUR_PAGE', label: 'Facebook' },
  { Icon: Mail, href: 'mailto:apexstructureconsultant@gmail.com', label: 'Gmail' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/YOUR_PAGE', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com/YOUR_HANDLE', label: 'Instagram' },
]

const footerServices = [
  'Architecture Planning',
  'Structural Engineering',
  'Industrial Building Design',
  'Interior Design',
  'MEP Engineering',
  'Steel Fabrication',
  'Pre-Engineered Buildings',
  'Cost Estimation & Tender',
]

const quickLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/team', label: 'Our Team' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="relative py-12" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="absolute inset-0" style={{ background: '#030812' }} />
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 2px 10px rgba(249,115,22,0.5)' }}>
              <Building2 size={18} className="text-white" />
              <img src="/logo.jpeg" alt="Logo" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[13px] md:text-sm text-white tracking-wide leading-tight">Apex Structure Consultants <span style={{ color: '#fb923c' }}>.</span></span>
              <span className="text-[9px] md:text-[10px] text-orange-400/90 font-bold uppercase tracking-[0.1em] mt-0.5">Design & Analysis</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-slate-500 text-xs">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-orange-500" />
              <span>123 Engineering Way, Industrial District, City, Country</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Mail size={14} className="flex-shrink-0 text-orange-500" />
              <span>apexstructureconsultant@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Phone size={14} className="flex-shrink-0 text-orange-500" />
              <span>+1 (555) 000-0000</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-semibold text-white text-sm mb-4">Quick Links</p>
          <ul className="space-y-2">
            {quickLinks.map((item) => (
              <li key={item.path}>
                <Link
                  className="text-slate-500 hover:text-orange-400 transition-colors text-xs text-left block"
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <p className="font-semibold text-white text-sm mb-4">Our Services</p>
          <ul className="space-y-2">
            {footerServices.map((service) => (
              <li key={service} className="flex items-start gap-1.5">
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#f97316' }} />
                <span className="text-slate-500 hover:text-orange-400 transition-colors text-xs cursor-default leading-relaxed">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <p className="font-semibold text-white text-sm mb-4">Connect</p>
          <div className="flex gap-3 mb-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <Icon size={14} className="text-slate-400 hover:text-orange-400 transition-colors" />
              </a>
            ))}
          </div>
          <p className="text-slate-600 text-xs">© {new Date().getFullYear()} ApexStructure.<br />All rights reserved.</p>
        </div>

      </div>
    </footer>
  )
}
