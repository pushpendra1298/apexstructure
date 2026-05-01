import { useLocation, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import Navbar from './Navbar'

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const Service = lazy(() => import('./components/service'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const PaymentPage = lazy(() => import('./pages/PaymentPage'))
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'))

// Loading fallback component
const PageLoader = () => (
  <div style={{ height: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020810' }}>
    <div style={{ width: 40, height: 40, border: '3px solid rgba(249,115,22,0.2)', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/services" element={<Service />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </Suspense>
    </>
  )
}