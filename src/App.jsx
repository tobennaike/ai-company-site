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
    <div className="min-h-screen">
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
  )
}
