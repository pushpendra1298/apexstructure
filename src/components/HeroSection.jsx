import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Link } from 'react-router-dom'

const gradText = { background: 'linear-gradient(135deg, #fb923c, #fbbf24, #fb923c)', backgroundSize: '200% 100%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer-gold 3s ease infinite' }
const primaryShadow = '0 4px 24px rgba(249,115,22,0.4), inset 0 1px 0 rgba(255,255,255,0.15)'

const fade = (y, delay = 0) => ({ initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7 } })

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30,60,120,0.2) 0%, transparent 70%), linear-gradient(180deg, #020810 0%, #030c18 50%, #020810 100%)', paddingTop: 100 }}>

      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-20 blur-3xl" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-15 blur-3xl" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-16">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div {...fade(-20)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 md:mb-8"
              style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316', boxShadow: '0 0 10px #f97316' }} />
              <span className="text-xs md:text-sm font-bold tracking-wider uppercase" style={{ color: '#fb923c', letterSpacing: '0.1em' }}>
                Elite Infrastructure & IRTT Governance
              </span>
            </div>
          </motion.div>

          <motion.h1 {...fade(30, 0.1)} className="font-black leading-tight mb-4 md:mb-6"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', letterSpacing: '-0.02em', textShadow: '0 0 60px rgba(249,115,22,0.3)' }}>
            <span style={gradText}>Precision<br className="md:hidden" /> Engineering.</span>
            <br />
            <span className="text-white">Predictable<br className="md:hidden" /> Delivery.</span>
          </motion.h1>

          <motion.p {...fade(20, 0.2)} className="text-slate-400 leading-relaxed mb-8 md:mb-10 mx-auto"
            style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.125rem)', maxWidth: '42rem', fontWeight: 400 }}>
            Trusted by global developers for risk-managed infrastructure delivery.
            Continuous intelligence with IRTT, stage-gate assurance, and compliance-grade execution.
          </motion.p>

          <motion.div {...fade(20, 0.3)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm md:text-base transition-all w-full sm:w-auto justify-center"
              style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff', boxShadow: primaryShadow }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(249,115,22,0.6)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = primaryShadow }}>
              Get a Quote <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <Link to="/projects"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-sm md:text-base transition-all w-full sm:w-auto justify-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' }}
              onMouseEnter={e => { Object.assign(e.currentTarget.style, { background: 'rgba(249,115,22,0.08)', borderColor: 'rgba(249,115,22,0.35)', color: '#fb923c', transform: 'translateY(-2px)' }) }}
              onMouseLeave={e => { Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)', transform: '' }) }}>
              <Play size={18} fill="#fb923c" className="opacity-80" /> View Projects
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-16 md:mt-20 hidden md:block">
            <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              className="flex flex-col items-center gap-2 mx-auto group" style={{ color: 'rgba(255,255,255,0.3)' }}>
              <span className="text-xs uppercase tracking-widest font-semibold">Scroll to explore</span>
              <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
                <div className="w-1 h-2 rounded-full" style={{ background: '#fb923c', animation: 'float 2s ease-in-out infinite' }} />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer-gold { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
      `}</style>
    </section>
  )
}
