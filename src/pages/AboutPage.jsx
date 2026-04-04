import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, ArrowLeft, Mail, Phone, Facebook, Linkedin, Instagram, Users, Target, Award, Rocket } from 'lucide-react'
import Footer from '../Footer'

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com/YOUR_PAGE', label: 'Facebook' },
  { Icon: Mail, href: 'mailto:apexstructureconsultant@gmail.com', label: 'Gmail' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/YOUR_PAGE', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com/YOUR_HANDLE', label: 'Instagram' },
]

const teamMembers = [
  {
    name: 'Rajendra Singh',
    role: 'Director & Founder',
    description: 'Visionary structural engineer with 20+ years of experience leading complex infrastructure projects and ensuring IRTT compliance.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Amit Kumar',
    role: 'Co-Founder & Lead Architect',
    description: 'Expert in Vastu-compliant architectural planning and sustainable design, driving innovation across global projects.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Priya Sharma',
    role: 'Senior Structural Engineer',
    description: 'Specializes in high-rise and industrial building design with advanced BIM modeling and precision engineering.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Vikram Patel',
    role: 'MEP Engineering Lead',
    description: 'Ensures seamless mechanical, electrical, and plumbing integrations for massive commercial and industrial projects.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  }
]

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Outfit', sans-serif", background: '#030812' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030812; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
      `}</style>



      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,60,120,0.25) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #050c1a 60%, #030812 100%)' }}>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#f97316' }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: '#3b82f6' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            Who We Are
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            About Our {' '}
            <span style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Agency & Team
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Pioneering precision engineering and predictive risk management. We are a collective of structural engineers, architects, and visionaries.
          </motion.p>
        </div>
      </section>

      {/* ── ABOUT DETAILS ── */}
      <section className="relative pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              { icon: Target, title: 'Our Mission', desc: 'To provide resilient, high-quality, and cost-effective structural and architectural solutions tailored to the modern built environment.' },
              { icon: Award, title: 'Our Vision', desc: 'To be the global standard in IRTT-driven project delivery, ensuring transparency, safety, and precision in every blueprint we create.' },
              { icon: Rocket, title: 'Our Approach', desc: 'Fusing cutting-edge technology such as 3D BIM modeling with core engineering principles and Vastu compliance for holistic building design.' }
            ].map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="rounded-3xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15), rgba(249,115,22,0.05))', border: '1px solid rgba(249,115,22,0.3)' }}>
                  <item.icon size={22} style={{ color: '#fb923c' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE TEAM ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] mb-4"
              style={{ color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <Users size={12} /> Leadership
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">Meet Our <span style={{ color: '#fb923c' }}>Team</span></h2>
            <p className="text-slate-400 mt-5 max-w-2xl mx-auto text-sm">
              The brilliant minds behind our precision execution. Our directors, co-founders, and specialized engineers bring decades of industry mastery.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {/* Founder (Text Left, Image Right) */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{teamMembers[0].name}</h3>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: '#fb923c' }}>{teamMembers[0].role}</p>
                <div className="w-12 h-px mb-6" style={{ background: '#f97316' }} />
                <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">{teamMembers[0].description}</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 hover:scale-105 text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Linkedin size={16} /></a>
                  <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 hover:scale-105 text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Mail size={16} /></a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2 h-80 lg:h-96 rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <img src={teamMembers[0].image} alt={teamMembers[0].name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" style={{ filter: 'grayscale(10%) contrast(1.1)' }} />
              </motion.div>
            </div>

            {/* Co-Founder (Text Left, Image Right) */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="order-2 md:order-1 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{teamMembers[1].name}</h3>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase mb-6" style={{ color: '#fb923c' }}>{teamMembers[1].role}</p>
                <div className="w-12 h-px mb-6" style={{ background: '#f97316' }} />
                <p className="text-slate-400 text-base leading-relaxed mb-8 max-w-md">{teamMembers[1].description}</p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 hover:scale-105 text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Linkedin size={16} /></a>
                  <a href="#" className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 hover:scale-105 text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}><Mail size={16} /></a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="order-1 md:order-2 h-80 lg:h-96 rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <img src={teamMembers[1].image} alt={teamMembers[1].name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" style={{ filter: 'grayscale(10%) contrast(1.1)' }} />
              </motion.div>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-20 flex justify-center">
            <Link to="/team" className="flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 8px 25px rgba(249,115,22,0.4)' }}>
              Meet Our Team <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  )
}
