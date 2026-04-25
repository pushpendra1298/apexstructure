import { useMemo, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { CheckCircle2, ArrowRight, MapPin, Layers, Quote, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { featuredProjects, tagColors } from './data/projects'
import { useSiteData } from './hooks/useSiteData'

const defaultServices = [
  { name: 'Architecture Planning', description: 'Vastu-compliant designs including floor plans, machine layouts, sections, elevations, 3D elevations, and authority submissions.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Structural Engineering Design', description: 'Design solutions for residential, commercial, institutional, and multistory buildings.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Industrial Building Design', description: 'Warehouses, RMG units, factories, boiler buildings, and pipe rack structures.', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cost Estimation & Tender', description: 'Accurate cost estimation and detailed tender documentation services.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
]

const timeline = [
  { year: '2018', label: 'Founded as a boutique engineering team', icon: '🏗️' },
  { year: '2020', label: 'First  76 projects delivered successfully', icon: '🏆' },
  { year: '2022', label: 'Expanded with international clientele', icon: '🌍' },
  { year: '2025', label: 'Awarded Best Engineering Firm', icon: '⭐' },
]

const testimonials = [
  { client: 'Amit Sharma', role: 'Project Manager, Delhi', feedback: 'Apex Structure delivered exceptional quality and precision. Their team handled everything from planning to execution with complete professionalism.' },
  { client: 'Priya Mehta', role: 'Architect, Mumbai', feedback: 'Highly reliable and detail-oriented team. Their Vastu-based designs and modern approach created the perfect balance for our project.' },
  { client: 'Rahul Verma', role: 'Builder, Bangalore', feedback: "Timely delivery, transparent communication, and excellent engineering support. One of the best firms we've worked with." },
  { client: 'Morgan Associates', role: 'CEO, USA', feedback: 'Their structural expertise and execution strategy helped us optimize both cost and timeline efficiently.' },
  { client: 'Luna Realty', role: 'Director, UAE', feedback: 'Professional, responsive, and highly skilled. Apex Structure ensured smooth coordination across all project stages.' },
  { client: 'ArcRise Builders', role: 'Founder, UK', feedback: 'Outstanding attention to detail and on-site supervision. The team maintained quality standards at every step.' },
]

const aboutPoints = [
  'Industry-leading structural evaluation with third-party verification',
  'ISO 9001 / ISO 45001 quality and safety-first implementation',
  'IRTT-enabled risk and turnaround tracking for every milestone',
  'Digital BIM coordination with executive dashboards',
]

const badgeStyle = { display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '5px 16px', borderRadius: 100, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }
const glassCard = 'glass-card'
const cardStyle = { borderRadius: 22, overflow: 'hidden', cursor: 'pointer', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s', display: 'flex', flexDirection: 'column' }

const arrowBtnStyle = { width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.05)', color: '#fb923c', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }
const arrowHoverIn = e => { e.currentTarget.style.background = 'rgba(249,115,22,0.12)'; e.currentTarget.style.borderColor = 'rgba(249,115,22,0.3)' }
const arrowHoverOut = e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }

function SectionTitle({ title, subtitle, center = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} style={{ textAlign: center ? 'center' : 'left', marginBottom: 48 }}
      initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
      <div style={badgeStyle}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} className="shimmer" />
        <span style={{ fontSize: 11, fontWeight: 800, color: '#fb923c', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{subtitle}</span>
      </div>
      <h2 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>{title}</h2>
      <div style={{ height: 2, width: 60, borderRadius: 99, background: 'linear-gradient(90deg,#f97316,#fbbf24)', margin: center ? '0 auto' : '0' }} />
    </motion.div>
  )
}

function Section({ id, children, bg = 'transparent', style = {} }) {
  return (
    <section id={id} style={{ position: 'relative', padding: '72px 0', overflow: 'hidden', ...style }}>
      {bg && <div style={{ position: 'absolute', inset: 0, background: bg, zIndex: 0 }} />}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>{children}</div>
    </section>
  )
}

export default function SectionsPage() {
  const { services } = useSiteData()
  const displayServices = services.length > 0 ? services.map(s => ({
    name: s.name,
    description: s.description,
    image: s.image_url || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80'
  })) : defaultServices;

  const stages = useMemo(() => [
    { step: '01', label: 'Planning', desc: 'Project strategy & feasibility study with detailed risk profiling.' },
    { step: '02', label: 'Design', desc: 'Architectural + structural engineering packages with BIM coordination.' },
    { step: '03', label: 'Execution ', desc: 'Site management, quality control, and safety compliance.' },
    { step: '04', label: 'Delivery', desc: 'Final handover with IRTT certification and ongoing support.' },
  ], [])

  const [userReviews, setUserReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem('apex_client_reviews') || '[]') } catch { return [] }
  })

  useEffect(() => {
    const fn = () => { try { setUserReviews(JSON.parse(localStorage.getItem('apex_client_reviews') || '[]')) } catch { /* Ignore missing reviews */ } }
    window.addEventListener('apex_review_added', fn)
    return () => window.removeEventListener('apex_review_added', fn)
  }, [])

  const allTestimonials = useMemo(() => [
    ...userReviews.map(r => ({ client: r.client, role: r.role || 'Client', feedback: r.feedback })),
    ...testimonials,
  ], [userReviews])

  const [slide, setSlide] = useState(0)
  const total = Math.ceil(allTestimonials.length / 3)

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % total), 3000)
    return () => clearInterval(t)
  }, [total])

  return (
    <>
      {/* ABOUT */}
      <Section id="about" style={{ paddingTop: '20px' }} bg="radial-gradient(ellipse 70% 60% at 20% 50%, rgba(249,115,22,0.04) 0%, transparent 60%), linear-gradient(180deg,#020810 0%,#040f1d 50%,#020810 100%)">
        <SectionTitle title="About Our Agency" subtitle="Who We Are" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <motion.div initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className={glassCard} style={{ borderRadius: 28, padding: 36, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,0.12),transparent 70%)', pointerEvents: 'none' }} />
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 14 }}>
              Global civil design with<br /><span className="text-gradient-orange">local responsibility</span>
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>
              Our multidisciplinary team delivers sustainable, resilient and code-compliant engineering services across residential, commercial, infrastructure and industrial sectors.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {aboutPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 13.5, color: 'rgba(255,255,255,0.65)' }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <CheckCircle2 size={11} color="#fb923c" />
                  </span>
                  {pt}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className={glassCard} style={{ borderRadius: 28, padding: 36 }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 28 }}>
              Our <span className="text-gradient-orange">Timeline</span>
            </h3>
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: 1, background: 'linear-gradient(180deg,#f97316,rgba(249,115,22,0.05))' }} />
              {timeline.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }} style={{ position: 'relative', marginBottom: i < timeline.length - 1 ? 28 : 0 }}>
                  <div style={{ position: 'absolute', left: -22, top: 4, width: 12, height: 12, borderRadius: '50%', background: '#f97316', boxShadow: '0 0 12px rgba(249,115,22,0.7)', border: '2px solid rgba(249,115,22,0.3)' }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: '#fb923c' }}>{item.year}</span>
                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* SERVICES */}
      <Section id="services" bg="linear-gradient(180deg,#020810 0%,#040f1c 50%,#020810 100%)">
        <SectionTitle title="Our Services" subtitle="Comprehensive Solutions" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 18 }}>
          {displayServices.slice(0, 4).map(({ name, description, image }, i) => (
            <motion.div key={name} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }} style={cardStyle}
              whileHover={{ y: -10, boxShadow: '0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.2)' }}>
              <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                <motion.img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.65)' }}
                  whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(4,15,28,0.95) 0%,rgba(4,15,28,0.1) 60%,transparent 100%)' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#f97316,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#fff' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
              <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: 8 }}>{name}</h4>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, flex: 1, fontWeight: 300 }}>{description}</p>
                <div style={{ marginTop: 14, height: 1, width: 0, background: 'linear-gradient(90deg,#f97316,#fbbf24)', borderRadius: 99, transition: 'width 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.width = '100%'} onMouseLeave={e => e.currentTarget.style.width = '0'} />
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 36 }}>
          <Link to="/services" className="btn-primary">View All {displayServices.length} Services <ArrowRight size={14} /></Link>
          <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.2)' }}>Showing 4 of {displayServices.length} services</p>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* PROJECTS */}
      <Section id="projects" bg="radial-gradient(ellipse 60% 50% at 70% 50%,rgba(30,60,120,0.08) 0%,transparent 60%),linear-gradient(180deg,#020810 0%,#040f1d 50%,#020810 100%)">
        <SectionTitle title="Featured Projects" subtitle="Our Portfolio" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 18 }}>
          {featuredProjects.map((p, idx) => {
            const tc = tagColors[p.tag] || tagColors['Commercial']
            return (
              <motion.article key={p.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }} className={glassCard} style={{ borderRadius: 22, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }} whileHover={{ y: -10 }}>
                <div style={{ height: 192, overflow: 'hidden', position: 'relative' }}>
                  <motion.img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }}
                    whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(2,8,16,0.95) 0%,transparent 55%)' }} />
                  <span style={{ position: 'absolute', top: 12, right: 12, fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 99, background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}>{p.tag}</span>
                  <span style={{ position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 700, padding: '3px 9px', borderRadius: 8, background: 'rgba(2,8,16,0.7)', color: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(6px)' }}>#{p.id}</span>
                </div>
                <div style={{ padding: '16px 18px', flex: 1 }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: 10 }}>{p.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={10} color="#fb923c" />{p.location}</p>
                    {p.area && p.area !== '—' && <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 5 }}><Layers size={10} color="#fb923c" />{p.area}</p>}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 36 }}>
          <Link to="/projects" className="btn-primary">View All Projects <ArrowRight size={14} /></Link>
          <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.2)' }}>Showing 4 of 49 projects</p>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* PROCESS */}
      <Section id="process" bg="linear-gradient(180deg,#020810 0%,#050e1c 50%,#020810 100%)">
        <SectionTitle title="Our Process" subtitle="From Planning to Delivery" />
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', top: 28, left: '12.5%', right: '12.5%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(249,115,22,0.4) 20%,rgba(249,115,22,0.4) 80%,transparent)', pointerEvents: 'none' }} className="hidden lg:block" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
            {stages.map(({ step, label, desc }, idx) => (
              <motion.div key={step} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.12 }} className={glassCard} style={{ borderRadius: 24, padding: 28, position: 'relative', overflow: 'hidden' }}
                whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(249,115,22,0.2)' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', marginBottom: 18, background: 'linear-gradient(135deg,#f97316,#ea580c)', boxShadow: '0 6px 24px rgba(249,115,22,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#fff' }}>{step}</div>
                <h4 style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{label}</h4>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
                <div style={{ position: 'absolute', bottom: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'radial-gradient(circle,rgba(249,115,22,0.08),transparent 70%)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* TESTIMONIALS */}
      <Section id="testimonials" bg="radial-gradient(ellipse 60% 50% at 50% 50%,rgba(249,115,22,0.04) 0%,transparent 60%),linear-gradient(180deg,#020810 0%,#040f1d 50%,#020810 100%)">
        <SectionTitle title="Client Stories" subtitle="Testimonials" />
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            <motion.div key={slide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18 }}>
              {allTestimonials.slice(slide * 3, slide * 3 + 3).map(item => (
                <div key={item.client} className={glassCard} style={{ borderRadius: 24, padding: 28, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 20, right: 20, opacity: 0.08 }}><Quote size={48} color="#f97316" /></div>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#f97316" color="#f97316" />)}
                  </div>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, flex: 1, fontStyle: 'italic', fontWeight: 300, marginBottom: 20 }}>"{item.feedback}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,rgba(249,115,22,0.3),rgba(234,88,12,0.15))', border: '1px solid rgba(249,115,22,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: '#fb923c' }}>{item.client[0]}</div>
                    <div>
                      <p style={{ fontSize: 13.5, fontWeight: 800, color: '#fff' }}>{item.client}</p>
                      <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.35)' }}>{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 32 }}>
          <button onClick={() => setSlide(p => (p - 1 + total) % total)} style={arrowBtnStyle} onMouseEnter={arrowHoverIn} onMouseLeave={arrowHoverOut}>‹</button>
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: total }).map((_, i) => (
              <button key={i} onClick={() => setSlide(i)}
                style={{ width: slide === i ? 24 : 8, height: 8, borderRadius: 99, border: 'none', cursor: 'pointer', background: slide === i ? '#f97316' : 'rgba(255,255,255,0.18)', transition: 'all 0.3s', padding: 0 }} />
            ))}
          </div>
          <button onClick={() => setSlide(p => (p + 1) % total)} style={arrowBtnStyle} onMouseEnter={arrowHoverIn} onMouseLeave={arrowHoverOut}>›</button>
        </div>
      </Section>
    </>
  )
}