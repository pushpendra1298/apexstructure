import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Building2, ArrowLeft, Mail, Phone, MapPin, Send, ClipboardList, Facebook, Linkedin, Instagram } from 'lucide-react'
import Footer from '../Footer'

const socialLinks = [
  { Icon: Facebook, href: 'https://facebook.com/YOUR_PAGE', label: 'Facebook' },
  { Icon: Mail, href: 'mailto:apexstructureconsultant@gmail.com', label: 'Gmail' },
  { Icon: Linkedin, href: 'https://linkedin.com/company/YOUR_PAGE', label: 'LinkedIn' },
  { Icon: Instagram, href: 'https://instagram.com/YOUR_HANDLE', label: 'Instagram' },
]

export default function ContactPage() {
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
      <section className="relative pt-36 pb-16 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(30,60,120,0.25) 0%, transparent 60%), linear-gradient(180deg, #030812 0%, #050c1a 60%, #030812 100%)' }}>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ background: '#f97316' }} />
        <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full opacity-10 blur-3xl" style={{ background: '#3b82f6' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase mb-5"
            style={{ color: '#fb923c', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            Get In Touch
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-5">
            Start Your{' '}
            <span style={{ background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Project
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Connect with our engineering team for a custom scope and precision cost estimate — backed by IRTT-grade risk intelligence.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT FORM & MAP ── */}
      <section className="relative pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* INFO & MAP SECTION */}
            <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-col gap-8">

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                    <MapPin size={18} style={{ color: '#fb923c' }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Our Location</h4>
                    <span className="text-slate-400 text-xs mt-1 block">123 Engineering Way, Industrial District, City, Country</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                    <Mail size={18} style={{ color: '#fb923c' }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Email Us</h4>
                    <span className="text-slate-400 text-xs mt-1 block">apexstructureconsultant@gmail.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                    <Phone size={18} style={{ color: '#fb923c' }} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Call Us</h4>
                    <span className="text-slate-400 text-xs mt-1 block">+1 (555) 000-0000 | +91 7771 97709</span>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS EMBED */}
              <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                {/* 
                  Paste your actual Google Maps embed link below in the "src" attribute.
                  You can get it by searching your business on Google Maps -> Share -> Embed a map -> Copy HTML
                  Extract ONLY the url inside src="..."
                */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.7246153061657!2d78.19028000196734!3d26.20988741217712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c41ccf7f5aaf%3A0x833d6af5b5e0f7d4!2sAkansha%20Apartment%2C%20City%20Center%2C%20Patel%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh%20474002!5e0!3m2!1sen!2sin!4v1775297465431!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(80%)' }} // Adds a dark mode style filter
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Location"
                ></iframe>
              </div>

            </motion.div>

            {/* FORM SECTION */}
            <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>

              <h3 className="text-2xl font-bold text-white mb-6">Send an <span style={{ color: '#fb923c' }}>Inquiry</span></h3>

              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                {['Full Name', 'Phone Number', 'Email', 'Project Type', 'Location', 'Budget Range'].map((placeholder) => (
                  <input key={placeholder} type="text" placeholder={placeholder}
                    className="rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder-slate-500 col-span-1"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                ))}
              </div>

              <textarea rows={5} placeholder="Tell us more about your project requirements..."
                className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder-slate-500 mb-6"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              />

              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 15px rgba(249,115,22,0.3)' }}>
                  <Send size={14} /> Send Message
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
                  <Phone size={14} /> WhatsApp Us
                </button>
              </div>

            </motion.div>
          </div>
        </div >
      </section >

      {/* ── FOOTER ── */}
      <Footer />
    </div >
  )
}
