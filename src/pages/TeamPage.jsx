import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, ArrowLeft, Mail, Phone, Facebook, Linkedin, Instagram, Users } from 'lucide-react'
import Footer from '../Footer'

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com/YOUR_PAGE', label: 'Facebook' },
  { Icon: Mail, href: 'mailto:apexstructureconsultant@gmail.com', label: 'Gmail' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/YOUR_PAGE', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com/YOUR_HANDLE', label: 'Instagram' },
]

const teamMembers = [
  {
    name: 'Shailendra Pratap Singh Bhadoriya',
    role: 'Associate Architect (Urban Plus)',
    description: 'An accomplished Associate Architect at Urban Plus, specializing in high-rise, commercial, and industrial building design with expertise in advanced BIM modeling, precision engineering, and efficient project execution.',
    image: './sudhanshu11.jpg'
  },
  {
    name: 'Shubhanshu Mandlik',
    role: 'Associate Architect (Urban Plus)',
    description: 'An accomplished Associate Architect at Urban Plus, specializing in high-rise, commercial, and industrial building design with expertise in advanced BIM modeling, precision engineering, and efficient project execution.',
    image: './sudhanshu11.jpg'
  },
  {
    name: 'Dr.Kamal sharma',
    role: 'Associate Architect (Urban Plus)',
    description: 'An accomplished Associate Architect at Urban Plus, specializing in high-rise, commercial, and industrial building design with expertise in advanced BIM modeling, precision engineering, and efficient project execution.',
    image: './sudhanshu11.jpg'
  },


  {
    name: 'Shiv Kumar',
    role: 'Steel fabrication Engineer',
    description: 'Specializes in high-rise and industrial building design with advanced BIM modeling and precision engineering.',
    image: './shiv1.jpeg'
  },
  {
    name: 'prateek Bajpayee',
    role: 'Billing and Costimation',
    description: 'Ensures seamless mechanical, electrical, and plumbing integrations for massive commercial and industrial projects.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Kuldeep Singh',
    role: 'Steel fabrication Engineer',
    description: 'Specializes in high-rise and industrial building design with advanced BIM modeling and precision engineering.',
    image: './kudeep.jpeg'
  },
  {
    name: 'Nawab Pal',
    role: 'Draft Men',
    description: 'Ensures seamless mechanical, electrical, and plumbing integrations for massive commercial and industrial projects.',
    image: './nawab1.jpg'
  },
  {
    name: 'Pushpendra prajapati',
    role: 'Data Management',
    description: 'Ensures seamless mechanical, electrical, and plumbing integrations for massive commercial and industrial projects.',
    image: './push.jpg'
  },
  {
    name: 'Kp1',
    role: 'Associate Architect (Urban Plus)',
    description: 'An accomplished Associate Architect at Urban Plus, specializing in high-rise, commercial, and industrial building design with expertise in advanced BIM modeling, precision engineering, and efficient project execution.',
    image: './sudhanshu11.jpg'
  },
  {
    name: 'Kp2',
    role: 'Associate Architect (Urban Plus)',
    description: 'An accomplished Associate Architect at Urban Plus, specializing in high-rise, commercial, and industrial building design with expertise in advanced BIM modeling, precision engineering, and efficient project execution.',
    image: './sudhanshu11.jpg'
  },
  {
    name: 'Kp3',
    role: 'Associate Architect (Urban Plus)',
    description: 'An accomplished Associate Architect at Urban Plus, specializing in high-rise, commercial, and industrial building design with expertise in advanced BIM modeling, precision engineering, and efficient project execution.',
    image: './sudhanshu11.jpg'
  },

  {
    name: 'Nakul',
    role: 'Billing And Estimation Division',
    description: 'Ensures seamless mechanical, electrical, and plumbing integrations for massive commercial and industrial projects.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  }


]

export default function TeamPage() {
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
            Professionals
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            Meet Our {' '}
            <span style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Exceptional Team
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Our multi-disciplinary team of engineers, architects, and managers works collaboratively to bring innovative solutions to life.
          </motion.p>
        </div>
      </section>

      {/* ── ALL TEAM MEMBERS ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, idx) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="group rounded-3xl overflow-hidden relative"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="h-72 overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: 'grayscale(20%) contrast(1.1)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.98) 0%, rgba(3,8,18,0.2) 50%, transparent 100%)' }} />

                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#fb923c' }}>{member.role}</p>
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <p className="text-slate-400 text-sm leading-relaxed">{member.description}</p>
                  <div className="mt-5 flex gap-3">
                    <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)' }}><Linkedin size={14} /></a>
                    <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 text-slate-400 hover:text-white" style={{ background: 'rgba(255,255,255,0.05)' }}><Mail size={14} /></a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <Footer />
    </div>
  )
}
