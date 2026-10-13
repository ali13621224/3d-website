import Scene3D from './components/Scene3D.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Scene3D />
      <Navbar />
      <main className="content">
        <Hero />
        <Features />
        <Footer />
      </main>
    </>
  )
}
