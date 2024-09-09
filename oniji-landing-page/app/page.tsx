import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Partners from '@/components/partners'
import Contact from '@/components/contact'
import Footer from '@/components/footer'

export default function LandingPage(): JSX.Element {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}