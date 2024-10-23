import Image from 'next/image'

const features:any = {
  en:{
    subTitle: "Key Features",
    title: "Unlock Your Mind's Potential",
    description: "Our futuristic meditation booth uses cutting-edge technology to guide you through a personalized meditation session, helping you recharge.",
    features: [
      {
        title: "Brainwave Detection",
        description: "Our booth uses advanced sensors to detect your brainwaves, allowing us to customize your meditation experience."
      },
      {
        title: "Immersive Sensations",
        description: "Experience a symphony of sights, sounds, and scents that guide you through your meditation session."
      },
      {
        title: "Personalized Therapy",
        description: "Our experts analyze your brainwave data to provide a customized meditation experience tailored to your emotional state."
      }
    ]
  },
  fr:{
    subTitle: "Caractéristiques clés",
    title: "Déverrouillez le potentiel de votre esprit",
    description: "Notre boîtier de méditation futuriste utilise la technologie avancée pour vous guider à travers une session de méditation personnalisée, vous aidant à vous recharger.",
    features: [
      {
        title: "Détection des ondes cérébrales",
        description: "Notre boîtier utilise des capteurs avancés pour détecter vos ondes cérébrales, permettant de personnaliser votre expérience de méditation."
      },
      {
        title: "Immersive Sensations",
        description: "Expérience une symphonie de couleurs, de sons et de parfums qui vous guident à travers votre session de méditation."
      },
      {
        title: "Personalized Therapy",
        description: "Nos experts analysent vos données d'ondes cérébrales pour fournir une expérience de méditation personnalisée adaptée à votre état d'esprit."
      }
    ]
  }
}

export default function Features({ params }: { params: { lang: string } }): JSX.Element {
  if (!features[params.lang]) {
    return <></>
  }
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-primary mb-4">{features[params.lang].subTitle}</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">{features[params.lang].title}</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {features[params.lang].description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/images/booth.png"
            alt="Oniji Features"
            width={450}
            height={450}
            className="w-full max-w-[260px] mx-auto rounded-xl object-cover object-center md:order-last"
          />
          <div className="space-y-8">
            {features[params.lang].features.map((feature:any, index:any) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-primary font-bold rounded-full">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}