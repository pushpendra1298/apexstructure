import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quote, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '../Footer'

const testimonials = [
  { client: 'Amit Sharma', role: 'Project Manager, Delhi', feedback: 'Apex Structure delivered exceptional quality and precision. Their team handled everything from planning to execution with complete professionalism. We were impressed by their attention to structural integrity and commitment to deadlines.' },
  { client: 'Priya Mehta', role: 'Architect, Mumbai', feedback: 'Highly reliable and detail-oriented team. Their Vastu-based designs and modern approach created the perfect balance for our project. The 3D elevations and authority submissions were handled seamlessly.' },
  { client: 'Rahul Verma', role: 'Builder, Bangalore', feedback: 'Timely delivery, transparent communication, and excellent engineering support. One of the best firms we have worked with. Their structural reports were thorough and construction-ready.' },
  { client: 'Morgan Associates', role: 'CEO, USA', feedback: 'Their structural expertise and execution strategy helped us optimize both cost and timeline efficiently. The IRTT risk tracking dashboard gave us real-time visibility at every stage.' },
  { client: 'Luna Realty', role: 'Director, UAE', feedback: 'Professional, responsive, and highly skilled. Apex Structure ensured smooth coordination across all project stages. From MEP design to final handover, everything was handled with precision.' },
  { client: 'ArcRise Builders', role: 'Founder, UK', feedback: 'Outstanding attention to detail and on-site supervision. The team maintained quality standards at every step. Their pre-engineered building design saved us significant cost and time.' },
  { client: 'NorthFlow Infrastructure', role: 'Managing Director, Canada', feedback: 'Apex Structure exceeded our expectations with their RCC culvert and bridge design. The documentation was thorough and the structural calculations were precise, giving us full confidence in the project.' },
  { client: 'MetroBuild Pvt Ltd', role: 'Technical Head, Pune', feedback: 'We engaged Apex Structure for our industrial warehouse project. The design was optimized for load efficiency and the fabrication drawings were delivered ahead of schedule.' },
  { client: 'Esco Ventures', role: 'Project Director, Singapore', feedback: 'A world-class engineering firm with local sensibility. Their STP and water tank design for our residential complex was flawless and passed all regulatory checks on the first submission.' },
]

const gradText = { background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
const avatarStyle = (w, fs) => ({ width: w, height: w, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,rgba(249,115,22,0.3),rgba(234,88,12,0.15))', border: '1px solid rgba(249,115,22,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fb923c', fontWeight: 800, fontSize: fs })
const navBtnStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }

const PER = 3

export default function TestimonialsPage() {
  const [slide, setSlide] = useState(0)
  const total = Math.ceil(testimonials.length / PER)

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % total), 4000)
    return () => clearInterval(t)
  }, [total])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #030812 0%, #050c1a 50%, #030812 100%)', fontFamily: "'Outfit', sans-serif", color: '#fff' }}>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
.glass-card{background:linear-gradient(135deg,rgba(255,255,255,0.04) 0%,rgba(255,255,255,0.01) 100%);border:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(20px);box-shadow:0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05)}
.tcard-hover{transition:transform 0.3s ease,box-shadow 0.3s ease,border-color 0.3s ease}
.tcard-hover:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(0,0,0,0.5),0 0 0 1px rgba(249,115,22,0.2);border-color:rgba(249,115,22,0.25)!important}
.nav-btn{width:44px;height:44px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform 0.2s,background 0.2s;color:#fb923c}
.nav-btn:hover{transform:scale(1.1)}
      `}</style>

      <div style={{ paddingTop: 110, paddingBottom: 60 }}>
        {/* HEADER */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center" style={{ marginBottom: 56 }}>
          <motion.span initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            Client Success
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            What Our <span style={gradText}>Clients Say</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Trusted by 115+ clients across the globe. See why engineers, architects, and visionaries choose Apex Structure for precision execution.
          </motion.p>
        </div>

        {/* STATS */}
        <div style={{ maxWidth: 900, margin: '0 auto 60px', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[{ value: '357+', label: 'Happy Clients', icon: Users }, { value: '4.8', label: 'Average Rating', icon: Star }, { value: '487+', label: 'Projects Delivered', icon: Quote }].map(({ value, label, icon: Icon }) => (
              <div key={label} className="glass-card" style={{ borderRadius: 20, padding: 22, textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 4px 14px rgba(249,115,22,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Icon size={18} color="#fff" />
                </div>
                <p style={{ fontSize: '1.7rem', fontWeight: 800, ...gradText, margin: '0 0 4px' }}>{value}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CAROUSEL */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ overflow: 'hidden', marginBottom: 32 }}>
            <AnimatePresence mode="wait">
              <motion.div key={slide} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }} style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
                {testimonials.slice(slide * PER, slide * PER + PER).map(item => (
                  <div key={item.client} className="glass-card tcard-hover"
                    style={{ borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.07)', cursor: 'default' }}>
                    <div style={{ marginBottom: 16 }}><Quote size={28} style={{ color: 'rgba(249,115,22,0.25)' }} /></div>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                      {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#f97316" style={{ color: '#f97316' }} />)}
                    </div>
                    <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.75, flex: 1, fontStyle: 'italic', marginBottom: 24 }}>"{item.feedback}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={avatarStyle(44, 16)}>{item.client[0]}</div>
                      <div>
                        <p style={{ fontWeight: 700, color: '#fff', fontSize: 14, margin: '0 0 2px' }}>{item.client}</p>
                        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0 }}>{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CONTROLS */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <button className="nav-btn" onClick={() => setSlide(p => (p - 1 + total) % total)} style={navBtnStyle}><ChevronLeft size={20} /></button>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {Array.from({ length: total }).map((_, i) => (
                <button key={i} onClick={() => setSlide(i)}
                  style={{ borderRadius: 100, border: 'none', cursor: 'pointer', transition: 'all 0.3s', width: slide === i ? 28 : 8, height: 8, background: slide === i ? '#f97316' : 'rgba(255,255,255,0.18)' }} />
              ))}
            </div>
            <button className="nav-btn" onClick={() => setSlide(p => (p + 1) % total)} style={navBtnStyle}><ChevronRight size={20} /></button>
          </div>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 14 }}>
            Showing {slide * PER + 1}–{Math.min((slide + 1) * PER, testimonials.length)} of {testimonials.length} reviews
          </p>
        </div>

        {/* ALL REVIEWS GRID */}
        <div style={{ maxWidth: 1200, margin: '60px auto 0', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ color: '#fb923c', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>All Reviews</p>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, margin: 0 }}>Every Client, Every Story</h2>
          </div>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
            {testimonials.map((item, i) => (
              <motion.div key={item.client} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }} className="glass-card tcard-hover"
                style={{ borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#f97316" style={{ color: '#f97316' }} />)}
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, flex: 1, fontStyle: 'italic', marginBottom: 16 }}>"{item.feedback}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={avatarStyle(36, 14)}>{item.client[0]}</div>
                  <div>
                    <p style={{ fontWeight: 700, color: '#fff', fontSize: 13, margin: '0 0 1px' }}>{item.client}</p>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, margin: 0 }}>{item.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
