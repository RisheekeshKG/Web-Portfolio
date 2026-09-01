import { About } from '@/components/About'
import { Achievements } from '@/components/Achievements'
import { Contact } from '@/components/Contact'
import { CustomCursor } from '@/components/CustomCursor'
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
    <div className="min-h-dvh overflow-x-clip bg-canvas text-ink antialiased">
      <CustomCursor />
      <ScrollProgress />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>

      <Header />

      {/* Full width on purpose — Hero and Section each own their own
          full-bleed background and constrain only their inner content, via
          the shared CONTAINER width in @/lib/layout. */}
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <SystemProject />
        <Projects />
        <Research />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
