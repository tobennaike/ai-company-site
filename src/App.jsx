import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Sponsors from './components/Sponsors'
import Services from './components/Services'
import Stats from './components/Stats'
import HowItWorks from './components/HowItWorks'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Very subtle grid background overlay */}
      <div className="fixed inset-0 bg-grid mask-fade-b opacity-[0.08] pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Sponsors />
        <Services />
        <Stats />
        <HowItWorks />
        <About />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
