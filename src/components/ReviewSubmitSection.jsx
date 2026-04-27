import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { MessageSquarePlus, Star, Send, CheckCircle2, Quote } from 'lucide-react'

const gradText = { background: 'linear-gradient(90deg, #fb923c, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
const labelStyle = { fontSize: 11, fontWeight: 700, color: '#fb923c', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: 7 }
const inputStyle = {
  width: '100%', padding: '14px 18px', borderRadius: 14,
  border: '1px solid #e2e8f0', background: '#ffffff', color: '#1e293b',
  fontSize: 14, fontFamily: "'Outfit', sans-serif", outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s', boxSizing: 'border-box',
}
const onFocus = e => { e.currentTarget.style.borderColor = '#f97316'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.12)' }
const onBlur = e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }

export default function ReviewSubmitSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [review, setReview] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !review.trim() || !rating || isSubmitting) return

    setIsSubmitting(true)
    try {
      const res = await fetch('/backend/submit_review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: name.trim(),
          role: role.trim() || 'Client',
          rating: rating,
          feedback: review.trim()
        }),
      })
      const json = await res.json()
      if (json.status === 'success') {
        setName(''); setRole(''); setRating(0); setReview('')
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        alert(json.message || 'Failed to submit review')
      }
    } catch {
      alert('Connection error. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const disabled = !name.trim() || !review.trim() || !rating || isSubmitting

  return (
    <section ref={ref} style={{
      position: 'relative', overflow: 'hidden',
      background: 'radial-gradient(ellipse 70% 55% at 30% 50%, rgba(249,115,22,0.06) 0%, transparent 60%), linear-gradient(180deg, #020810 0%, #040f1d 50%, #020810 100%)',
      padding: '80px 0',
    }}>
      <div style={{ position: 'absolute', top: -100, right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.07), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: '10%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.05), transparent 65%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: -60, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.04), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14, padding: '5px 16px', borderRadius: 100, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f97316', display: 'inline-block' }} className="shimmer" />
            <span style={{ fontSize: 11, fontWeight: 800, color: '#fb923c', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Share Your Experience</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Leave a <span style={gradText}>Review</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
            Your feedback helps us improve and inspires others to build with confidence.
          </p>
          <div style={{ height: 2, width: 60, borderRadius: 99, background: 'linear-gradient(90deg, #f97316, #fbbf24)', margin: '16px auto 0' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, alignItems: 'start' }}>
          {/* Info Panel */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(249,115,22,0.02))', border: '1px solid rgba(249,115,22,0.15)', borderRadius: 28, padding: '40px 36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(251,191,36,0.08), transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ width: 56, height: 56, borderRadius: 16, marginBottom: 24, background: 'linear-gradient(135deg, #f97316, #ea580c)', boxShadow: '0 8px 28px rgba(249,115,22,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageSquarePlus size={26} color="#fff" />
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
              We Value Your <span style={gradText}>Feedback</span>
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>
              Your review helps future clients make informed decisions and motivates our team to keep delivering excellence.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { icon: '⭐', title: 'Rate Our Work', desc: 'Share how satisfied you are with our engineering services.' },
                { icon: '💬', title: 'Share Your Story', desc: 'Tell others about your project experience with us.' },
                { icon: '🏗️', title: 'Help Us Improve', desc: 'Your insights drive our commitment to excellence.' },
              ].map(({ icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{icon}</div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{title}</p>
                    <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 300 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(249,115,22,0.12)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['357+', 'Happy Clients'], ['4.8★', 'Average Rating']].map(([n, l]) => (
                <div key={l}>
                  <p style={{ fontSize: 26, fontWeight: 900, ...gradText, margin: '0 0 2px' }}>{n}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{l}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Review Form */}
          <motion.div initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}>
            <form onSubmit={handleSubmit} style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 28, padding: '36px 32px', backdropFilter: 'blur(20px)', boxShadow: '0 12px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 32, right: 32, height: 2, background: 'linear-gradient(90deg, transparent, #f97316, transparent)', borderRadius: 99 }} />
              <div style={{ position: 'absolute', top: 16, right: 20, opacity: 0.04, pointerEvents: 'none' }}><Quote size={70} color="#f97316" /></div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Write Your Review</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 28, fontWeight: 300 }}>Fill in the details below and share your experience.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={labelStyle}>Your Name *</label>
                  <input type="text" placeholder="e.g. Amit Sharma" value={name} onChange={e => setName(e.target.value)} required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <div>
                  <label style={labelStyle}>Your Role</label>
                  <input type="text" placeholder="e.g. Architect, Mumbai" value={role} onChange={e => setRole(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ ...labelStyle, marginBottom: 10 }}>Rating *</label>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '10px 16px', borderRadius: 14, background: 'rgba(249,115,22,0.04)', border: '1px solid rgba(249,115,22,0.1)', width: 'fit-content' }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} type="button" onClick={() => setRating(s)} onMouseEnter={() => setHover(s)} onMouseLeave={() => setHover(0)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 3, transition: 'transform 0.2s', transform: (hover >= s || rating >= s) ? 'scale(1.2)' : 'scale(1)' }}>
                      <Star size={28}
                        fill={(hover || rating) >= s ? '#f97316' : 'transparent'}
                        color={(hover || rating) >= s ? '#f97316' : 'rgba(255,255,255,0.15)'}
                        style={{ transition: 'all 0.2s', filter: (hover || rating) >= s ? 'drop-shadow(0 0 6px rgba(249,115,22,0.5))' : 'none' }}
                      />
                    </button>
                  ))}
                  {rating > 0 && <span style={{ marginLeft: 10, fontSize: 14, color: '#fb923c', fontWeight: 800 }}>{rating}/5</span>}
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Your Review *</label>
                <textarea placeholder="Share your experience with Apex Structure..." value={review} onChange={e => setReview(e.target.value)} required rows={4}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: 120, lineHeight: 1.7 }} onFocus={onFocus} onBlur={onBlur} />
              </div>

              <button type="submit" disabled={disabled}
                style={{
                  width: '100%', padding: '16px 28px', borderRadius: 14, border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  background: disabled ? 'rgba(255,255,255,0.06)' : 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: disabled ? 'rgba(255,255,255,0.25)' : '#fff',
                  fontSize: 15, fontWeight: 800, fontFamily: "'Outfit', sans-serif",
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'all 0.3s',
                  boxShadow: disabled ? 'none' : '0 6px 24px rgba(249,115,22,0.4)',
                  letterSpacing: '0.03em',
                }}
                onMouseEnter={e => { if (!disabled) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(249,115,22,0.55)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = disabled ? 'none' : '0 6px 24px rgba(249,115,22,0.4)' }}
              >
                <Send size={16} /> Send Review
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div initial={{ opacity: 0, y: 12, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.95 }} transition={{ duration: 0.35 }}
                    style={{ marginTop: 18, padding: '14px 20px', borderRadius: 14, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle2 size={18} color="#22c55e" />
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: '#4ade80' }}>Thank you! Your review has been submitted successfully.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
