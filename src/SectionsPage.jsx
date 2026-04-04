import { useMemo, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  ClipboardList,
  MapPin,
  Phone,
  Send,
  Star,
  Layers,
} from 'lucide-react'
import { featuredProjects, tagColors } from './data/projects'



const timelinePoints = [
  { year: '2010', label: 'Started as a boutique team' },
  { year: '2014', label: 'First 50 projects complete' },
  { year: '2018', label: 'Expanded with international clients' },
  { year: '2023', label: 'Awarded Best Engineering Firm' },
]

const testimonials = [
  {
    client: "Amit Sharma",
    role: "Project Manager, Delhi",
    feedback: "Apex Structure delivered exceptional quality and precision. Their team handled everything from planning to execution with complete professionalism."
  },
  {
    client: "Priya Mehta",
    role: "Architect, Mumbai",
    feedback:
      "Highly reliable and detail-oriented team. Their Vastu-based designs and modern approach created the perfect balance for our project."
  },
  {
    client: "Rahul Verma",
    role: "Builder, Bangalore",
    feedback:
      "Timely delivery, transparent communication, and excellent engineering support. One of the best firms we've worked with."
  },
  {
    client: "Morgan Associates",
    role: "CEO, USA",
    feedback:
      "Their structural expertise and execution strategy helped us optimize both cost and timeline efficiently."
  },
  {
    client: "Luna Realty",
    role: "Director, UAE",
    feedback:
      "Professional, responsive, and highly skilled. Apex Structure ensured smooth coordination across all project stages."
  },
  {
    client: "ArcRise Builders",
    role: "Founder, UK",
    feedback:
      "Outstanding attention to detail and on-site supervision. The team maintained quality standards at every step."
  }
]

const serviceCards = [
  { name: 'Architecture Planning', description: 'Vastu-compliant designs including floor plans, machine layouts, sections, elevations, 3D elevations, and authority submissions.', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Structural Engineering Design', description: 'Design solutions for residential, commercial, institutional, and multistory buildings.', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=800&q=80' },
  { name: 'Industrial Building Design', description: 'Warehouses, RMG units, factories, boiler buildings, and pipe rack structures.', image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Electrical Engineering Design', description: 'SLDs, load calculations, BOQs, DB details, lighting, cable tray, and earthing layouts.', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Interior Design', description: 'Functional and Vastu-compliant interior design solutions for modern spaces.', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80' },
  { name: 'MEP Engineering Design', description: 'Comprehensive mechanical, electrical, and plumbing design services.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Steel Fabrication Drawing', description: 'Detailed fabrication drawings for steel structures and components.', image: 'https://images.unsplash.com/photo-1536240478700-b869ad10ed34?auto=format&fit=crop&w=800&q=80' },
  { name: 'Pre-Engineered Building Design', description: 'Estimation, design, and drawing services for PEB building systems.', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80' },
  { name: 'Conventional Steel Building Design', description: 'Designs for trusses, portal frames, and tubular steel structures.', image: 'https://images.unsplash.com/photo-1590272456521-1bbe160a18ce?auto=format&fit=crop&w=800&q=80' },
  { name: 'STP & ETP Water Tank Design', description: 'Design services for sewage and effluent treatment plant systems.', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80' },
  { name: 'Detailed Project Report Preparation', description: 'Comprehensive DPR preparation for engineering and infrastructure projects.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
  { name: 'RCC Culvert & Bridge Design', description: 'Structural design solutions for RCC culverts, bridges, and crossings.', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80' },
  { name: 'Cost Estimation & Tender Drawing', description: 'Accurate cost estimation and detailed tender documentation services.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { name: 'Building Design through Vastu', description: 'Customized architectural planning that integrates Vastu principles.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
]

function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-14 space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#fb923c' }}>{subtitle}</p>
      <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{title}</h2>
      <div className="mx-auto h-px w-20 mt-4" style={{ background: 'linear-gradient(90deg, transparent, #f97316, transparent)' }} />
    </div>
  )
}

export default function SectionsPage() {
  const processStages = useMemo(() => [
    { step: 'Planning', desc: 'Project strategy & feasibility study with detailed risk profiling.' },
    { step: 'Design', desc: 'Architectural + structural engineering packages with BIM coordination.' },
    { step: 'Execution', desc: 'Site management, quality control, and safety compliance.' },
    { step: 'Delivery', desc: 'Final handover with IRTT certification and ongoing support.' },
  ], [])

  // Testimonial carousel state
  const [activeSlide, setActiveSlide] = useState(0)
  const totalSlides = testimonials.length - 2 // slides: 0,1,2,3 (groups of 3 from 6)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % totalSlides)
    }, 2000)
    return () => clearInterval(timer)
  }, [totalSlides])

  return (
    <>
      {/* ABOUT */}
      <section id="about" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(249,115,22,0.05) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle title="About Our Agency" subtitle="Who We Are" />
          <div className="grid gap-6 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Global civil design with<br /><span className="text-gradient-orange">local responsibility</span></h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Our multidisciplinary team delivers sustainable, resilient and code-compliant engineering services across residential, commercial, infrastructure and industrial sectors.</p>
              <ul className="space-y-3">
                {['Industry-leading structural evaluation methods with third-party verification', 'ISO 9001 / ISO 45001 quality and safety-first implementation', 'IRTT-enabled risk and turnaround tracking for every milestone', 'Digital BIM coordination with executive dashboards'].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                      <CheckCircle2 size={12} style={{ color: '#fb923c' }} />
                    </div>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="glass-card rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Timeline <span className="text-gradient-orange">Achievements</span></h3>
              <div className="relative space-y-5 pl-8">
                <div className="absolute left-3 top-2 bottom-2 w-px" style={{ background: 'linear-gradient(180deg, #f97316, rgba(249,115,22,0.1))' }} />
                {timelinePoints.map((item, i) => (
                  <motion.div key={item.year} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative">
                    <div className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full" style={{ background: '#f97316', boxShadow: '0 0 8px rgba(249,115,22,0.6)' }} />
                    <p className="font-black text-sm" style={{ color: '#fb923c' }}>{item.year}</p>
                    <p className="text-slate-400 text-sm mt-0.5">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030812 0%, #04101e 50%, #030812 100%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle title="Our Services" subtitle="Comprehensive Solutions" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {serviceCards.slice(0, 4).map(({ name, description, image }, i) => (
              <motion.div key={name} whileHover={{ y: -8 }} whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group rounded-3xl overflow-hidden cursor-pointer flex flex-col"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.25)', backdropFilter: 'blur(16px)', transition: 'all 0.35s ease' }}>
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: 'brightness(0.7)' }} />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.95) 0%, rgba(3,8,18,0.2) 60%, transparent 100%)' }} />
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff' }}>{i + 1}</div>
                </div>
                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="font-bold text-white text-sm mb-2 leading-snug group-hover:text-orange-200 transition-colors duration-300">{name}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed flex-1">{description}</p>
                  <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Services — navigates to /services page */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <Link
              to="/services"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
              }}
            >
              {/* shimmer sweep on hover */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }}
              />
              <span className="relative z-10">View All {serviceCards.length} Services</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <p className="text-slate-600 text-xs">Showing 4 of {serviceCards.length} services</p>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(30,60,120,0.1) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle title="Featured Projects" subtitle="Our Portfolio" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProjects.map((project, idx) => {
              const tc = tagColors[project.tag] || tagColors['Commercial']
              return (
                <motion.article key={project.id} whileHover={{ y: -10 }}
                  initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="glass-card rounded-3xl overflow-hidden cursor-pointer group flex flex-col">
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img src={project.image} alt={project.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: 'brightness(0.7)' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.95) 0%, transparent 55%)' }} />
                    <span className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}>
                      {project.tag}
                    </span>
                    <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-md"
                      style={{ background: 'rgba(3,8,18,0.7)', color: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(6px)' }}>
                      #{project.id}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-white text-sm leading-snug mb-3 group-hover:text-orange-100 transition-colors">{project.name}</h3>
                    <div className="space-y-1.5 flex-1">
                      <p className="text-slate-400 text-xs flex items-center gap-1.5">
                        <MapPin size={10} style={{ color: '#fb923c', flexShrink: 0 }} />{project.location}
                      </p>
                      {project.area && project.area !== '—' && (
                        <p className="text-slate-400 text-xs flex items-center gap-1.5">
                          <Layers size={10} style={{ color: '#fb923c', flexShrink: 0 }} />{project.area}
                        </p>
                      )}
                      {project.client && project.client !== '—' && (
                        <p className="text-slate-500 text-xs leading-relaxed mt-1">{project.client}</p>
                      )}
                    </div>
                    <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
                  </div>
                </motion.article>
              )
            })}
          </div>

          {/* View All Projects */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-col items-center gap-3">
            <Link to="/projects"
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)' }} />
              <span className="relative z-10">View All Projects</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
            <p className="text-slate-600 text-xs">Showing 4 of 49 projects</p>
          </motion.div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #030812 0%, #050e1c 50%, #030812 100%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle title="Our Process" subtitle="From Planning to Delivery" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 relative">
            <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), rgba(249,115,22,0.4), transparent)' }} />
            {processStages.map(({ step, desc }, idx) => (
              <motion.div key={step} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-3xl p-6 relative">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 font-black text-sm relative z-10"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 16px rgba(249,115,22,0.4)' }}>
                  {idx + 1}
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{step}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="relative py-24 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(249,115,22,0.04) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #06101f 50%, #030812 100%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle title="Client Stories" subtitle="Testimonials" />

          {/* Carousel wrapper */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="grid gap-5 md:grid-cols-3"
              >
                {testimonials.slice(activeSlide, activeSlide + 3).map((item, i) => (
                  <div key={item.client} className="glass-card rounded-3xl p-7 flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => <Star key={j} size={12} fill="#f97316" style={{ color: '#f97316' }} />)}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 italic flex-1">"{item.feedback}"</p>
                    <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.3), rgba(234,88,12,0.2))', border: '1px solid rgba(249,115,22,0.3)' }}>
                        {item.client[0]}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{item.client}</p>
                        <p className="text-slate-500 text-xs">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators + arrows */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fb923c' }}
            >‹</button>

            <div className="flex gap-2">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: activeSlide === i ? 24 : 8,
                    height: 8,
                    background: activeSlide === i ? '#f97316' : 'rgba(255,255,255,0.18)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveSlide((prev) => (prev + 1) % totalSlides)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fb923c' }}
            >›</button>
          </div>
        </div>
      </section>
    </>
  )
}

