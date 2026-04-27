import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, animate, motion, useInView, useMotionValue } from 'framer-motion'
import { Building2, Calendar, CheckCircle2, Users, ArrowRight, ChevronDown, Star, Send, MessageSquarePlus, Quote } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CivilEngineeringHeroBackground from '../components/CivilEngineeringHeroBackground'
import SectionsPage from '../SectionsPage'
import Footer from '../Footer'
import { useSiteData } from '../hooks/useSiteData'

/* ── DATA ── */
const irttSlides = [
  {
    tag: 'Design Optimization',
    title: 'Structural Design Intelligence',
    description: 'AI-assisted optimization of steel sections, load paths, and material efficiency for cost-effective designs.',
    image: '/Industrial.webp'
  },
  {
    tag: 'Procurement',
    title: 'Smart Material Procurement',
    description: 'Real-time vendor comparison, rate analysis, and steel quantity tracking to prevent over-ordering and delays.',
    image: '/Warehouse.webp'
  },
  {
    tag: 'BIM & Coordination',
    title: 'Clash Detection & Coordination',
    description: 'Integrated BIM workflows to identify structural, MEP, and architectural conflicts before execution.',
    image: '/PEB.webp'
  },
  {
    tag: 'Construction Monitoring',
    title: 'On-Site Progress Tracking',
    description: 'Live tracking of fabrication, erection, and site progress with delay alerts and productivity insights.',
    image: '/Sinter.webp'
  },
  {
    tag: 'Quality Assurance',
    title: 'Inspection & Compliance Control',
    description: 'Digitized inspection workflows with weld tracking, QA checklists, and compliance reporting.',
    image: '/commercial.webp'
  }]

const clients = [
  'SCIENTIST ARCHITECTS', 'HOUSE OF MODERN LIVING', 'URBAN PLUS ARCHITECTS', 'DESIGN CAMPUS',
  'ARCKOHM', 'SPACE ARCHITECTURE', 'ARC TEST HOUSE & CONSULTANT LLP', 'BADRI RAI COMPANY',
  'DESCOS', 'SQUARE CONSULTANTS', 'LORD-TECH DATUS SOLUTIONS PVT. LTD.', 'CODIZYTECH', 'INFOPEARL TECH SOLUTIONS PVT. LTD.', 'SHODHYANTRI ENGINEERING SERVICES',
]

/* ── COUNT-UP HOOK ── */
function useCountUp(end, duration = 1.8, inView = true) {
  const [val, setVal] = useState(0)
  const mv = useMotionValue(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(mv, end, { duration, ease: 'easeOut', onUpdate: v => setVal(Math.round(v)) })
    return () => c.stop()
  }, [end, duration, inView, mv])
  return val
}

/* ── STAT CARD ── */
const cardBase = {
  background: 'linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 20, padding: '20px 22px',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)',
  transition: 'box-shadow 0.3s, transform 0.3s', cursor: 'default',
}
const cardHoverIn = e => {
  e.currentTarget.style.transform = 'translateY(-4px)'
  e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.2)'
}
const cardHoverOut = e => {
  e.currentTarget.style.transform = ''
  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)'
}

function StatCard({ icon: Icon, label, value, suffix = '+', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(value, 2.2, inView)
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}>
      <div style={cardBase} onMouseEnter={cardHoverIn} onMouseLeave={cardHoverOut}>
        <div style={{ width: 38, height: 38, borderRadius: 11, marginBottom: 12, background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 4px 16px rgba(249,115,22,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={17} color="#fff" />
        </div>
        <p style={{ fontSize: 28, fontWeight: 900, lineHeight: 1, background: 'linear-gradient(90deg,#fb923c,#fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{count}{suffix}</p>
        <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', marginTop: 5, lineHeight: 1.4 }}>{label}</p>
      </div>
    </motion.div>
  )
}

const gradText = { background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

/* ── VIDEO HERO SECTION ── */
function VideoHeroSection({ onNavigate }) {
  return (
    <section style={{ position: 'relative', minHeight: 'unset', paddingTop: 'calc(36px + clamp(52px, 8vw, 64px))', overflow: 'hidden', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', background: 'linear-gradient(180deg, #020810 0%, #030c18 60%, #020810 100%)' }}>
      <CivilEngineeringHeroBackground style={{ zIndex: 0, opacity: 0.88 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,255,255,0.06) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(0,0,0,0.28) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.05, mixBlendMode: 'overlay', backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 5px)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.035, mixBlendMode: 'soft-light', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E")` }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(249,115,22,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', padding: '0 24px', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(24px, 5vw, 60px)', paddingTop: 18, paddingBottom: 22 }}>
        <div style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 22 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 20px', borderRadius: 100, background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.35)', backdropFilter: 'blur(12px)', fontSize: 12, fontWeight: 700, color: '#fb923c', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              <span className="shimmer" style={{ width: 7, height: 7, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} />
              Elite Infrastructure &amp; IRTT Governance
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
            <h1 className="bebas text-6xl md:text-8xl leading-none text-white" style={{ textShadow: '0 4px 40px rgba(0,0,0,0.8)' }}>
              Precision<br />
              <span style={{ background: 'linear-gradient(90deg,#fb923c 0%,#fbbf24 50%,#fb923c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundSize: '200%', animation: 'shimmer 3s ease infinite' }}>Engineering</span>
              <br />Predictable<br />Delivery
            </h1>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.8 }}
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.8, maxWidth: 520, fontWeight: 300, margin: 0 }}>
            Apex Structure Consultants provides advanced structural design and analysis services, ensuring safety, efficiency, and economy. We specialize in RCC, steel, and PEB structures with precise engineering and timely delivery.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => onNavigate('/contact')} style={{ fontSize: 15, padding: '12px 32px' }}>Get a Quote <ArrowRight size={14} /></button>
            <button className="btn-ghost" onClick={() => onNavigate('/projects')} style={{ fontSize: 15, padding: '12px 32px' }}>View Projects</button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}



/* ── CLIENT MARQUEE ── */
function ClientMarquee() {
  const double = [...clients, ...clients]
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: 'linear-gradient(90deg,#030812,transparent)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 60, zIndex: 2, background: 'linear-gradient(270deg,#030812,transparent)', pointerEvents: 'none' }} />
      <div className="marquee-track" style={{ display: 'flex', gap: 16, width: 'max-content' }}>
        {double.map((name, i) => (
          <div key={i} style={{ padding: '7px 18px', borderRadius: 100, flexShrink: 0, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{name}</div>
        ))}
      </div>
    </div>
  )
}

/* ── TESTIMONIALS SECTION ── */
function TestimonialsSection() {
  const { reviews } = useSiteData()
  if (!reviews || reviews.length === 0) return null

  return (
    <section style={{ padding: '80px 0', background: '#020810', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 900, marginBottom: 16 }}>
            What Our <span style={gradText}>Clients Say</span>
          </h2>
          <div style={{ height: 2, width: 60, background: '#f97316', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '30px', position: 'relative' }}>
              <div style={{ color: '#fb923c', marginBottom: 15, fontSize: '1.2rem' }}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <span key={idx} style={{ color: idx < r.rating ? '#fb923c' : 'rgba(255,255,255,0.1)' }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                "{r.feedback}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #f97316, #ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 16 }}>
                  {r.client.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', margin: 0 }}>{r.client}</h4>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase' }}>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── MAIN PAGE ── */
export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const navigate = useNavigate()

  useEffect(() => { const iv = setInterval(() => setSlide(p => (p + 1) % irttSlides.length), 4500); return () => clearInterval(iv) }, [])

  const scrollDown = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div style={{ fontFamily: "'Outfit',sans-serif", background: '#020810', minHeight: '100vh', color: '#fff' }}>
      <main>
        <VideoHeroSection onNavigate={navigate} />

        <section style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg,#020810 0%,#030c18 60%,#020810 100%)' }}>


          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px 40px', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 14 }}>
                <StatCard icon={Building2} label="Completed Projects" value={487} delay={0.1} />
                <StatCard icon={Calendar} label="Years Experience" value={8} delay={0.2} />
                <StatCard icon={Users} label="Happy Clients" value={357} delay={0.3} />
                <StatCard icon={CheckCircle2} label="IRTT Compliance %" value={98} suffix="%" delay={0.4} />
                <StatCard icon={Calendar} label="Years of Excellence" value={10} delay={0.5} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
                style={{ background: 'linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 24, padding: '18px 24px', backdropFilter: 'blur(20px)' }}>
                <p style={{ fontSize: 10.5, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fb923c', marginBottom: 12, fontWeight: 700 }}>Trusted By</p>
                <ClientMarquee />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
                style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#fff', letterSpacing: '0.02em', margin: 0 }}>IRTT Operational Highlights</h3>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {irttSlides.map((_, i) => (
                      <button key={i} onClick={() => setSlide(i)} style={{ width: slide === i ? 20 : 6, height: 6, borderRadius: 99, border: 'none', cursor: 'pointer', background: slide === i ? '#f97316' : 'rgba(255,255,255,0.25)', transition: 'width 0.3s, background 0.3s', padding: 0 }} />
                    ))}
                  </div>
                </div>
                <div style={{ position: 'absolute', top: 58, left: 16, zIndex: 10 }}>
                  <AnimatePresence mode="wait">
                    <motion.span key={slide} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)', borderRadius: 100, padding: '4px 12px', fontSize: 10, fontWeight: 800, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-block' }}>
                      {irttSlides[slide].tag}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div style={{ height: 390, position: 'relative', overflow: 'hidden' }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={slide} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.5, ease: 'easeInOut' }} style={{ position: 'absolute', inset: 0 }}>
                      <img src={irttSlides[slide].image} alt={irttSlides[slide].title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,8,16,0.95) 0%,transparent 55%)' }} />
                      <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 6 }}>{irttSlides[slide].title}</h4>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65 }}>{irttSlides[slide].description}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer', marginTop: 32 }}
              onClick={scrollDown}>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Scroll</p>
              <ChevronDown size={16} color="rgba(249,115,22,0.6)" style={{ animation: 'float 1.8s ease-in-out infinite' }} />
            </motion.div>
          </div>
        </section>

        <TestimonialsSection />
        <SectionsPage />
      </main>

      <Footer />
    </div>
  )
}