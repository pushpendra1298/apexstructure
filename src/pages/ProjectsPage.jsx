import { useState } from 'react'
import { motion } from 'framer-motion'
import { Layers, MapPin, Building2 } from 'lucide-react'
import { projects, previousExperience, tagColors } from '../data/projects'
import Footer from '../Footer'

const allTags = ['All', ...Array.from(new Set(projects.map(p => p.tag)))]
const allCats = ['All', 'Architecture & Engineering', 'Structural Engineering']
const gradText = { background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

export default function ProjectsPage() {
  const [tag, setTag] = useState('All')
  const [cat, setCat] = useState('All')

  const visible = projects.filter(p => (tag === 'All' || p.tag === tag) && (cat === 'All' || p.category === cat))

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Outfit', sans-serif", background: '#030812' }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#030812}::-webkit-scrollbar-thumb{background:#f97316;border-radius:2px}`}</style>

      {/* HERO */}
      <section className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,60,120,0.25) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #050c1a 60%, #030812 100%)' }}>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#f97316' }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: '#3b82f6' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            Our Portfolio
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            All <span style={gradText}>Projects</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            A comprehensive portfolio of engineering and architectural projects spanning residential, commercial, institutional, healthcare, and infrastructure sectors across India and beyond.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}
            className="inline-flex flex-wrap justify-center gap-6 px-8 py-4 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            {[['487+', 'Projects'], ['2018', 'Started As Engineer'], ['11+', 'States Covered']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-xl font-black" style={{ color: '#fb923c' }}>{v}</p>
                <p className="text-xs text-slate-500 mt-0.5">{l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PREVIOUS EXPERIENCE */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="rounded-3xl p-7"
            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.07) 0%, rgba(234,88,12,0.04) 100%)', border: '1px solid rgba(249,115,22,0.18)' }}>
            <div className="flex items-start gap-4 flex-wrap">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 12px rgba(249,115,22,0.4)' }}>
                <Layers size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm mb-1">Previous Experience as Structural Engineer ({previousExperience.period})</p>
                <p className="text-slate-400 text-xs mb-3">Successfully contributed to diverse industrial & civil structures:</p>
                <div className="flex flex-wrap gap-2">
                  {previousExperience.types.map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="py-6 sticky top-[100px] z-30"
        style={{ background: 'rgba(3,8,18,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-3 items-center">
          <div className="flex gap-2 flex-wrap">
            {allCats.map(c => (
              <button key={c} onClick={() => setCat(c)} className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: cat === c ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'rgba(255,255,255,0.05)', color: cat === c ? '#fff' : 'rgba(255,255,255,0.5)', border: cat === c ? 'none' : '1px solid rgba(255,255,255,0.1)', boxShadow: cat === c ? '0 2px 10px rgba(249,115,22,0.35)' : 'none' }}>
                {c === 'All' ? 'All Categories' : c}
              </button>
            ))}
          </div>
          <div className="h-5 w-px hidden sm:block" style={{ background: 'rgba(255,255,255,0.1)' }} />
          <div className="flex gap-2 flex-wrap">
            {allTags.map(t => {
              const tc = tagColors[t], on = tag === t
              return (
                <button key={t} onClick={() => setTag(t)} className="px-2.5 py-1 rounded-lg text-xs font-medium transition-all"
                  style={{ background: on && tc ? tc.bg : 'rgba(255,255,255,0.04)', color: on && tc ? tc.color : 'rgba(255,255,255,0.4)', border: on && tc ? `1px solid ${tc.border}` : '1px solid rgba(255,255,255,0.08)' }}>
                  {t}
                </button>
              )
            })}
          </div>
          <span className="ml-auto text-slate-600 text-xs hidden sm:block">{visible.length} projects</span>
        </div>
      </section>

      {/* GRID */}
      <section className="py-12 relative">
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(circle at top left, rgba(249,115,22,0.1), transparent 30%), radial-gradient(circle at bottom right, rgba(249,115,22,0.07), transparent 28%)' }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {visible.length === 0 ? (
            <div className="text-center py-20 text-slate-500 text-sm">No projects match the selected filters.</div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p, i) => {
                const tc = tagColors[p.tag] || tagColors['Commercial']
                return (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.4, delay: (i % 4) * 0.07 }} whileHover={{ y: -6 }}
                    className="group rounded-3xl overflow-hidden flex flex-col"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.3s ease' }}>
                    <div className="relative h-44 overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" style={{ filter: 'brightness(0.65)' }} />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(3,8,18,0.97) 0%, rgba(3,8,18,0.1) 60%, transparent 100%)' }} />
                      <div className="absolute top-3 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{ background: 'rgba(3,8,18,0.75)', color: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(6px)' }}>
                          {p.category === 'Architecture & Engineering' ? 'Arch.' : 'Struct.'}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                        style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', color: '#fff' }}>{p.id}</div>
                      <div className="absolute bottom-3 left-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color }}>{p.tag}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h4 className="font-bold text-white text-sm mb-3 leading-snug group-hover:text-orange-100 transition-colors">{p.name}</h4>
                      <div className="space-y-2 flex-1">
                        {p.area && p.area !== '—' && (
                          <div className="flex items-start gap-2 text-xs text-slate-400">
                            <Layers size={11} className="mt-0.5 flex-shrink-0" style={{ color: '#fb923c' }} /><span>{p.area}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2 text-xs text-slate-400">
                          <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color: '#fb923c' }} /><span className="leading-relaxed">{p.location}</span>
                        </div>
                        {p.client && p.client !== '—' && (
                          <div className="flex items-start gap-2 text-xs text-slate-500">
                            <Building2 size={11} className="mt-0.5 flex-shrink-0" style={{ color: 'rgba(249,115,22,0.5)' }} /><span className="leading-relaxed">{p.client}</span>
                          </div>
                        )}
                        {p.contractor && (
                          <div className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="mt-0.5 w-2.5 flex-shrink-0 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>↪</span>
                            <span className="leading-relaxed italic">{p.contractor}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 rounded-full" style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
