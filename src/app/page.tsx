import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Terminal from './components/Terminal'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Terminal />
      <About />
      <Projects />
      <Contact />
    </main>
  )
}