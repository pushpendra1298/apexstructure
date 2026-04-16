import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import Footer from '../Footer'

const fields = [
  ['fullName', 'Full Name'], ['phoneNumber', 'Phone Number'], ['email', 'Email'],
  ['projectType', 'Project Type'], ['location', 'Location'], ['budgetRange', 'Budget Range'],
]

const contactInfo = [
  { Icon: MapPin, title: 'Our Location', text: 'City Centre, Gwalior, Near Raj Rajeshwari Apartment-474002' },
  { Icon: Mail, title: 'Email Us', text: 'apexstructureconsultants@gmail.com' },
  { Icon: Phone, title: 'Call Us', text: '+91 79701 47690' },
]

const inputCls = "rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all duration-200 placeholder-slate-500"
const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }
const iconBox = { background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }
const gradText = { background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }

export default function ContactPage() {
  const [form, setForm] = useState({ fullName: '', phoneNumber: '', email: '', projectType: '', location: '', budgetRange: '', message: '' })

  const onChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))

  const sendWhatsApp = () => {
    if (!form.fullName || !form.phoneNumber) return alert('Please fill in at least your name and phone number.')
    const text = `*New Project Inquiry* 🏗️\n\n👤 *Name:* ${form.fullName}\n📱 *Phone:* ${form.phoneNumber}\n📧 *Email:* ${form.email}\n🏗️ *Project:* ${form.projectType}\n📍 *Location:* ${form.location}\n💰 *Budget:* ${form.budgetRange}\n\n📝 *Message:* ${form.message}`
    window.open(`https://wa.me/+917970147690?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Outfit', sans-serif", background: '#030812' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#030812}::-webkit-scrollbar-thumb{background:#f97316;border-radius:2px}
      `}</style>

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
            Start Your <span style={gradText}>Project</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Connect with our engineering team for a custom scope and precision cost estimate — backed by IRTT-grade risk intelligence.
          </motion.p>
        </div>
      </section>

      <section className="relative pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {contactInfo.map(({ Icon, title, text }) => (
                  <div key={title} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={iconBox}>
                      <Icon size={18} style={{ color: '#fb923c' }} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{title}</h4>
                      <span className="text-slate-400 text-xs mt-1 block">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d223.7246153061657!2d78.19028000196734!3d26.20988741217712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c41ccf7f5aaf%3A0x833d6af5b5e0f7d4!2sAkansha%20Apartment%2C%20City%20Center%2C%20Patel%20Nagar%2C%20Gwalior%2C%20Madhya%20Pradesh%20474002!5e0!3m2!1sen!2sin!4v1775297465431!5m2!1sen!2sin"
                  width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(80%)' }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Map Location" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
              className="glass-card rounded-3xl p-7 flex flex-col justify-between"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-2xl font-bold text-white mb-6">Send an <span style={{ color: '#fb923c' }}>Inquiry</span></h3>
              <div className="grid gap-4 sm:grid-cols-2 mb-4">
                {fields.map(([name, ph]) => (
                  <input key={name} type="text" name={name} placeholder={ph} value={form[name]} onChange={onChange} className={inputCls} style={inputStyle} />
                ))}
              </div>
              <textarea rows={5} name="message" placeholder="Tell us more about your project requirements..." value={form.message} onChange={onChange}
                className="w-full resize-none rounded-xl px-4 py-3 text-sm text-white outline-none transition-all duration-200 placeholder-slate-500 mb-6" style={inputStyle} />
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 4px 15px rgba(249,115,22,0.3)' }}>
                  <Send size={14} /> Send Message
                </button>
                <button onClick={sendWhatsApp} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80' }}>
                  <Phone size={14} /> WhatsApp Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
