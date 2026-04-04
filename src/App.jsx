import { Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import Service from './components/service'
import ProjectsPage from './pages/ProjectsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/services" element={<Service />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  )
}