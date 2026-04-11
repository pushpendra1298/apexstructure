import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, ArrowLeft, Mail, Phone, Facebook, Linkedin, Instagram, Users } from 'lucide-react'
import Footer from '../Footer'

const teamMembers = [
  {
    name: 'Shailendra Pratap Singh Bhadoriya',
    role: 'Associate Architect ',
    experience: '16+ Years Experience',
    description: 'Associate Architect specializing in high-rise, commercial & industrial projects, advanced BIM, and precision-driven design.',
    image: './sudhanshu11.jpg'
  },
  {
    name: 'Shubhanshu Mandlik',
    role: 'Associate Architect ',
    experience: '15+ Years Experience',
    description: 'Experienced Associate Architect focused on high-rise, commercial & industrial projects with advanced BIM and execution excellence.',
    image: './shubhanshu.jpeg'
  },
  {
    name: 'Dr.Kamal sharma',
    role: 'Senior Structure Engineer ',
    experience: '11+ Years Experience',
    description: 'Experienced Senior Structure Engineer specializing in BIM-based structural design and efficient project execution.',
    image: './kamal.jpg'
  },
  {
    name: 'Priya Prajapati',
    role: 'HR',


    image: './sudhanshu11.jpg'
  },
  {
    name: 'Shiv Kumar',
    role: 'Design Engineer',


    image: './shiv1.jpeg'
  },
  {
    name: 'prateek Bajpayee',
    role: 'Billing and Cost Estimation',


    image: './prateek.jpg'
  },
  {
    name: 'Kuldeep Singh',
    role: 'Steel fabrication Engineer',


    image: './kudeep.jpeg'
  },
  {
    name: 'Nawab Pal',
    role: 'Senior Draftsman',
    experience: '8+ Years Experience',

    image: './nawab1.jpg'
  },

  {
    name: 'Arman Khan',
    role: 'Draftsman',


    image: './sudhanshu11.jpg'
  },
  {
    name: 'Pushpendra prajapati',
    role: 'Data Manager',


    image: './push.jpg'
  },
  {
    name: 'Amar',
    role: 'Site Supervisor',


    image: './sudhanshu11.jpg'
  },

  {
    name: 'Nakul',
    role: 'Site Engineer',


    image: './nakul.jpg'
  },
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
                <div className="h-96 overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" style={{ filter: 'grayscale(20%) contrast(1.1)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.98) 0%, rgba(3,8,18,0.2) 50%, transparent 100%)' }} />

                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-xs font-semibold tracking-wide uppercase" style={{ color: '#fb923c' }}>{member.role}</p>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest mt-1 font-medium">{member.experience}</p>
                  </div>
                </div>

                <div className="p-6 pt-4">
                  <p className="text-slate-400 text-sm leading-relaxed">{member.description}</p>
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
