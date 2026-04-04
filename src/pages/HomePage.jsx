import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
} from 'framer-motion'
import {
  Building2,
  Calendar,
  CheckCircle2,
  Mail,
  Phone,
  Users,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SectionsPage from '../SectionsPage'
import Footer from '../Footer'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

const irttSlides = [
  { tag: 'Assessment', title: 'Risk Profiling & Capacity Evaluation', description: 'Immediate visibility into permit, design, and cost risks for zone-wide portfolios.', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Planning', title: 'Schedule Integration with IRTT', description: 'Auto-trigger policy updates and cross-team status from multi-vendor handoffs.', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Execution', title: 'Live HSE & QC Status', description: '7-layer safety, quality, and compliance flags with proactive mitigation prompts.', image: 'https://images.unsplash.com/photo-1504436467286-2d2e2f0a7f1d?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Finance', title: 'Cost Forecasting Accuracy', description: 'Dynamic BOQ reconciliation with on-chain risk buffers for contingency control.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Stakeholder', title: 'Executive Reporting Suite', description: 'Daily IRTT heatmaps for board-ready decision support across country programs.', image: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80' },
  { tag: 'Improvement', title: 'Performance Lifecycle Reviews', description: 'Post-project IRTT analytics for continuous improvement and client retention.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80' },
]

const slideVariants = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.06 },
}

/* ─────────────────────────────────────────
   HOOKS & COMPONENTS
───────────────────────────────────────── */
function useCountUp(end, duration = 1.8, inView = true) {
  const [value, setValue] = useState(0)
  const motionValue = useMotionValue(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, end, {
      duration,
      ease: 'easeOut',
      onUpdate(latest) { setValue(Math.round(latest)) },
    })
    return () => controls.stop()
  }, [end, duration, inView, motionValue])
  return value
}

function CounterCard({ icon: Icon, label, value }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, 2.2, isInView)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
      }} className="rounded-2xl p-6 md:p-7 h-full min-h-[150px] w-full">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl mb-3" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}>
          <Icon size={18} className="text-white" />
        </div>
        <p className="text-3xl font-black" style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{count}+</p>
        <p className="text-xs text-slate-400 mt-1 leading-tight">{label}</p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────── */
export default function HomePage() {
  const [activeNav, setActiveNav] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % irttSlides.length), 5000)
    return () => clearInterval(interval)
  }, [])

  const navigate = useNavigate()

  const handleScroll = (id) => {
    if (id === 'contact') {
      navigate('/contact')
      return
    }
    if (id === 'about') {
      navigate('/about')
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveNav(id)
    setMenuOpen(false)
  }

  const baseStyle = {
    fontFamily: "'Outfit', sans-serif",
    background: '#030812',
  }

  return (
    <div style={baseStyle} className="min-h-screen text-white">
      {/* Global CSS */}
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030812; }
        ::-webkit-scrollbar-thumb { background: #f97316; border-radius: 2px; }
        .bebas { font-family: 'Bebas Neue', sans-serif; letter-spacing: 0.04em; }
        .glass-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .orange-glow { box-shadow: 0 0 30px rgba(249,115,22,0.3), 0 4px 16px rgba(249,115,22,0.2); }
        .text-gradient-orange {
          background: linear-gradient(90deg, #fb923c, #fbbf24);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .noise-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        @keyframes shimmer { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .shimmer { animation: shimmer 2s ease-in-out infinite; }
      `}</style>

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: '#030812' }}
            initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.6 } }}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full border border-orange-500/20 animate-ping absolute inset-0" />
              <div className="w-16 h-16 rounded-full border-2 border-t-orange-500 border-orange-500/10 animate-spin" style={{ boxShadow: '0 0 20px rgba(249,115,22,0.4)' }} />
            </div>
            <p className="mt-6 text-xs tracking-[0.3em] uppercase text-slate-500"> Structure</p>
          </motion.div>
        )}
      </AnimatePresence>



      <main>
        {/* ── HERO ── */}
        <section id="home" className="relative min-h-screen pt-24 overflow-hidden noise-overlay">
          {/* Deep space background */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(30,60,120,0.3) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 80% 50%, rgba(249,115,22,0.08) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #050c1a 50%, #030812 100%)' }} />

          <div className="max-w-7xl mx-auto px-6 relative z-10 py-12 grid lg:grid-cols-1 gap-10 items-start min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-8">
              {/* Badge */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
                className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', color: '#fb923c' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shimmer" />
                Elite Infrastructure &amp; IRTT Governance
              </motion.div>

              {/* Headline */}
              <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.8 }}>
                <h1 className="bebas text-6xl md:text-8xl leading-none text-white" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}>
                  Precision<br />
                  <span style={{ background: 'linear-gradient(90deg, #fb923c 0%, #fbbf24 50%, #fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%', animation: 'shimmer 3s ease infinite' }}>
                    Engineering.
                  </span>
                  <br />
                  Predictable<br />Delivery.
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.8 }}
                className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md" style={{ fontWeight: 300 }}>
                Trusted by global developers for risk-managed infrastructure delivery. Continuous intelligence with IRTT, stage-gate assurance, and compliance-grade execution.
              </motion.p>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.8 }}
                className="flex flex-wrap gap-3">
                <button onClick={() => handleScroll('contact')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105 hover:brightness-110 orange-glow"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                  Get Quote <ArrowRight size={14} />
                </button>
                <button onClick={() => handleScroll('projects')}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}>
                  Our Projects
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="grid grid-cols-2 sm:grid-cols-5 gap-6 lg:gap-8 w-full"
              >
                <CounterCard icon={Building2} label="Completed Projects" value={298} />
                <CounterCard icon={Calendar} label="Years Experience" value={14} />
                <CounterCard icon={Users} label="Happy Clients" value={115} />
                <CounterCard icon={CheckCircle2} label="IRTT Compliance %" value={99} />
                <CounterCard icon={Calendar} label="Years of Experience" value={10} />
              </motion.div>

              {/* Trusted by */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}
                className="glass-card rounded-3xl p-6">
                <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: '#fb923c' }}>Trusted by</p>
                <div className="flex flex-wrap gap-2">
                  {['Esco', 'Luna Corp', 'NorthFlow', 'ArcRise', 'MetroBuild'].map((logo) => (
                    <div key={logo} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 tracking-wide"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>{logo}</div>
                  ))}
                </div>
              </motion.div>

              {/* IRTT Slider */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
                className="glass-card rounded-3xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white tracking-wide">IRTT Operational Highlights</h3>
                  <div className="flex gap-1.5">
                    {irttSlides.map((_, i) => (
                      <button key={i} onClick={() => setCurrentSlide(i)}
                        className="rounded-full transition-all duration-300"
                        style={{ width: currentSlide === i ? 20 : 6, height: 6, background: currentSlide === i ? '#f97316' : 'rgba(255,255,255,0.2)' }} />
                    ))}
                  </div>
                </div>
                <div className="relative h-72 md:h-96 overflow-hidden rounded-xl">
                  <AnimatePresence mode="wait">
                    <motion.div key={currentSlide} variants={slideVariants} initial="initial" animate="animate" exit="exit"
                      transition={{ duration: 0.50, ease: 'easeInOut' }} className="absolute inset-0">
                      <img src={irttSlides[currentSlide].image} alt={irttSlides[currentSlide].title} className="h-full w-full object-cover" style={{ filter: 'brightness(0.6)' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.9) 0%, transparent 60%)' }} />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#fb923c' }}>{irttSlides[currentSlide].tag}</span>
                        <h4 className="text-base font-bold text-white mt-0.5 leading-tight">{irttSlides[currentSlide].title}</h4>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">{irttSlides[currentSlide].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <SectionsPage />
      </main>

      <Footer />
    </div>
  )
}
