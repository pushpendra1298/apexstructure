import { Smartphone, Monitor, Tablet } from 'lucide-react'

export default function ResponsiveExample() {
  const features = [
    { icon: Smartphone, title: 'Mobile First', description: 'Optimized for phones and tablets' },
    { icon: Monitor, title: 'Desktop Ready', description: 'Beautiful on large screens' },
    { icon: Tablet, title: 'Tablet Perfect', description: 'Seamless tablet experience' },
  ]

  const cards = [
    { id: 1, title: 'Card One', description: 'This card adapts beautifully across all screen sizes.' },
    { id: 2, title: 'Card Two', description: 'Responsive design ensures perfect display everywhere.' },
    { id: 3, title: 'Card Three', description: 'From mobile to desktop, always looking great.' },
    { id: 4, title: 'Card Four', description: 'Touch-friendly on mobile, hover effects on desktop.' },
  ]

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: "'Outfit', sans-serif", background: '#020810' }}>

      {/* Hero Section - Responsive */}
      <section className="relative pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
            style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }} />
          <div className="absolute bottom-20 right-10 w-48 md:w-80 h-48 md:h-80 rounded-full blur-3xl"
            style={{ background: '#3b82f6' }} />
        </div>

        <div className="container-responsive relative z-10">
          {/* Badge - Mobile Centered, Desktop Left */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left mb-6">
            <span className="badge-responsive"
              style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', color: '#fb923c' }}>
              <Star size={14} fill="#fb923c" />
              Responsive Design Example
            </span>
          </motion.div>

          {/* Heading - Responsive Text Size */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-h1 text-center md:text-left mb-6">
            <span style={{
              background: 'linear-gradient(90deg, #fb923c, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Responsive Design
            </span>{' '}
            <span className="text-white">Made Simple</span>
          </motion.h1>

          {/* Description - Responsive */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-responsive-base text-slate-400 max-w-mobile mx-auto md:mx-0 text-center md:text-left mb-8">
            This page demonstrates responsive design patterns that work perfectly on mobile, tablet, and desktop devices.
            Resize your browser or view on different devices to see it adapt.
          </motion.p>

          {/* Buttons - Stack on Mobile, Inline on Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="stack-mobile justify-center md:justify-start">
            <Link to="/contact" className="btn-responsive"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(249,115,22,0.4)'
              }}>
              Get Started <ArrowRight size={18} />
            </Link>
            <Link to="/projects" className="btn-responsive"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.9)'
              }}>
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - 1 Column Mobile, 2 Tablet, 3 Desktop */}
      <section className="spacing-section">
        <div className="container-responsive">
          <h2 className="heading-h2 text-center mb-12">
            <span style={{
              background: 'linear-gradient(90deg, #fb923c, #fbbf24)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Responsive Features
            </span>
          </h2>

          <div className="grid-responsive-3">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-responsive group cursor-pointer">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
                  <feature.icon size={24} color="#fff" />
                </div>
                <h3 className="text-responsive-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-responsive-sm text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Grid - Auto Fit */}
      <section className="spacing-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container-responsive">
          <h2 className="heading-h2 text-center mb-12 text-white">
            Adaptive Card Grid
          </h2>

          <div className="grid-auto-fit">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 md:p-8 hover:scale-105 transition-transform">
                <div className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl font-black"
                  style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c' }}>
                  {card.id}
                </div>
                <h3 className="text-responsive-lg font-bold text-white mb-3">{card.title}</h3>
                <p className="text-responsive-sm text-slate-400 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Text Alignment Demo */}
      <section className="spacing-section">
        <div className="container-responsive">
          <div className="text-center-mobile">
            <h2 className="heading-h2 mb-4">
              <span style={{ color: '#fb923c' }}>Text Alignment</span> Example
            </h2>
            <p className="text-responsive-base text-slate-400 max-w-mobile mb-6">
              This text is centered on mobile but left-aligned on desktop. Perfect for hero sections and content blocks.
            </p>
            <div className="inline-flex items-center gap-2 text-responsive-sm" style={{ color: '#fb923c' }}>
              <CheckCircle2 size={20} />
              <span>Responsive Typography</span>
            </div>
          </div>
        </div>
      </section>

      {/* Flex Direction Demo - Column on Mobile, Row on Desktop */}
      <section className="spacing-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container-responsive">
          <h2 className="heading-h2 text-center mb-12 text-white">
            Flexible Layout
          </h2>

          <div className="flex-responsive items-center">
            <div className="flex-1">
              <div className="aspect-video rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(59,130,246,0.2))' }}>
                <div className="w-full h-full flex items-center justify-center">
                  <Monitor size={64} style={{ color: '#fb923c' }} />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="heading-h3 text-white mb-4">Column on Mobile, Row on Desktop</h3>
              <p className="text-responsive-base text-slate-400 mb-6">
                This layout stacks vertically on mobile devices for better readability,
                then switches to a horizontal layout on larger screens.
              </p>
              <ul className="space-y-3">
                {['Automatic adaptation', 'No manual intervention', 'Perfect user experience'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-responsive-sm text-slate-300">
                    <CheckCircle2 size={18} style={{ color: '#fb923c', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Form Example */}
      <section className="spacing-section">
        <div className="container-responsive max-w-4xl">
          <h2 className="heading-h2 text-center mb-12">
            <span style={{ color: '#fb923c' }}>Responsive</span> Form
          </h2>

          <div className="card-responsive">
            <form className="form-responsive">
              <input type="text" placeholder="Full Name" className="input-responsive" />
              <input type="email" placeholder="Email Address" className="input-responsive" />
              <input type="tel" placeholder="Phone Number" className="input-responsive" />
              <input type="text" placeholder="Company" className="input-responsive" />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="input-responsive md:col-span-2"
                style={{ resize: 'none' }}
              />
              <button
                type="submit"
                className="btn-responsive md:col-span-2"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  color: '#fff',
                  boxShadow: '0 4px 20px rgba(249,115,22,0.4)'
                }}>
                <ArrowRight size={18} />
                Submit Form
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Show/Hide Demo */}
      <section className="spacing-section" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container-responsive">
          <h2 className="heading-h2 text-center mb-12 text-white">
            Conditional Display
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-responsive text-center mobile-only">
              <Smartphone size={32} className="mx-auto mb-4" style={{ color: '#fb923c' }} />
              <h4 className="text-responsive-lg font-bold text-white mb-2">Mobile Only</h4>
              <p className="text-responsive-sm text-slate-400">This card only shows on mobile devices</p>
            </div>

            <div className="card-responsive text-center tablet-up">
              <Tablet size={32} className="mx-auto mb-4" style={{ color: '#3b82f6' }} />
              <h4 className="text-responsive-lg font-bold text-white mb-2">Tablet & Up</h4>
              <p className="text-responsive-sm text-slate-400">Visible on tablet and desktop</p>
            </div>

            <div className="card-responsive text-center desktop-only">
              <Monitor size={32} className="mx-auto mb-4" style={{ color: '#22c55e' }} />
              <h4 className="text-responsive-lg font-bold text-white mb-2">Desktop Only</h4>
              <p className="text-responsive-sm text-slate-400">Only appears on desktop screens</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="spacing-section">
        <div className="container-responsive">
          <div className="card-responsive text-center max-w-3xl mx-auto"
            style={{
              background: 'linear-gradient(135deg, rgba(249,115,22,0.1), rgba(59,130,246,0.05))',
              border: '1px solid rgba(249,115,22,0.2)'
            }}>
            <h2 className="heading-h2 text-white mb-4">
              Ready to Build Responsive?
            </h2>
            <p className="text-responsive-base text-slate-400 mb-8 max-w-2xl mx-auto">
              Use these patterns in your project to create beautiful, responsive designs that work everywhere.
            </p>
            <Link to="/" className="btn-responsive mx-auto"
              style={{
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                color: '#fff',
                boxShadow: '0 4px 20px rgba(249,115,22,0.4)'
              }}>
              <ArrowRight size={18} />
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
