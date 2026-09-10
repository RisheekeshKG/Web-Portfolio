import { About } from '@/components/About'
import { Achievements } from '@/components/Achievements'
import { Activity } from '@/components/Activity'
import { Contact } from '@/components/Contact'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Research } from '@/components/Research'
import { SystemProject } from '@/components/SystemProject'
import { ScrollProgress } from '@/components/ScrollProgress'
import { useLenis } from '@/hooks/useLenis'

function App() {
  useLenis()

  return (
    <div className="min-h-dvh overflow-x-clip bg-ground text-ink antialiased">
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-small focus:text-ground"
      >
        Skip to content
      </a>

      <Header />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <SystemProject />
        <Projects />
        <Research />
        <Activity />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
