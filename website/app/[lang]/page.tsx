import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Partners from '@/components/partners'
import Contact from '@/components/contact'
import Footer from '@/components/footer'
import Demo from '@/components/demo'

export default function LandingPage({ params }: { params: { lang: string } }): JSX.Element {

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header params={params} />
      <main className="flex-1">
        <Hero params={params} />
        <Features params={params} />
        <Partners params={params} />
        <Demo params={params} />
        <Contact params={params} />
      </main>
      <Footer params={params} />
    </div>
  )
}