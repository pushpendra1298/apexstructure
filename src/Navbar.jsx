import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Building2, Mail, Phone, ArrowRight } from 'lucide-react'

const navLinks = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'projects', label: 'Projects', path: '/projects' },
  { id: 'process', label: 'Process', path: '/#process' },
  { id: 'testimonials', label: 'Testimonials', path: '/#testimonials' },
  { id: 'contact', label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-9"
        style={{ background: 'rgba(2, 6, 14, 0.95)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between text-[13px] text-slate-300">
          <span className="flex items-center gap-1.5"><Mail size={12} style={{ color: '#fb923c' }} />apexstructureconsultant@gmail.com</span>
          <span className="flex items-center gap-1.5"><Phone size={12} style={{ color: '#fb923c' }} />+1 (555) 123-9876 , +91 7771 97709</span>
        </div>
      </div>

      <header className="fixed top-9 left-0 right-0 z-50" style={{ background: 'rgba(3,8,18,0.85)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center relative overflow-hidden flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 2px 10px rgba(249,115,22,0.5)' }}>
              <Building2 size={18} className="text-white" />
              <img src="/logo.jpeg" alt="Logo" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-bold text-[13px] md:text-sm text-white tracking-wide leading-tight">Apex Structure Consultants <span style={{ color: '#fb923c' }}>.</span></span>
              <span className="text-[9px] md:text-[10px] text-orange-400/90 font-bold uppercase tracking-[0.1em] mt-0.5">Design & Analysis</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const currentPathHash = location.pathname + location.hash;
              const isActive = currentPathHash === item.path || (location.pathname === item.path && !item.path.includes('#') && item.path !== '/');
              return (
                <Link key={item.id} to={item.path}
                  className="relative px-3 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-200"
                  style={{ color: isActive ? '#fb923c' : 'rgba(255,255,255,0.6)', background: isActive ? 'rgba(249,115,22,0.1)' : 'transparent' }}>
                  {item.label}
                  {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px rounded-full" style={{ background: '#f97316' }} />}
                </Link>
              )
            })}
          </nav>

          <Link to="/contact" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 2px 12px rgba(249,115,22,0.4)' }}>
            Get Quote <ArrowRight size={12} />
          </Link>

          <button className="md:hidden text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-current transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-1" style={{ background: 'rgba(3,8,18,0.98)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {navLinks.map((item) => {
              const currentPathHash = location.pathname + location.hash;
              const isActive = currentPathHash === item.path || (location.pathname === item.path && !item.path.includes('#') && item.path !== '/');
              return (
                <Link key={item.id} to={item.path} onClick={() => setMenuOpen(false)}
                  className="text-left px-3 py-2.5 rounded-lg text-base font-medium transition-all"
                  style={{ color: isActive ? '#fb923c' : 'rgba(255,255,255,0.7)', background: isActive ? 'rgba(249,115,22,0.08)' : 'transparent' }}>
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </header>
    </>
  )
}
