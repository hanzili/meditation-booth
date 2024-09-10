import Image from 'next/image'

export default function Features(): JSX.Element {
  const features = [
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

  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm text-primary mb-4">Key Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Unlock Your Mind&apos;s Potential</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Our futuristic meditation booth uses cutting-edge technology to guide you through a personalized
            meditation session, helping you recharge.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Image
            src="/booth.png"
            alt="Oniji Features"
            width={450}
            height={450}
            className="w-full max-w-[260px] mx-auto rounded-xl object-cover object-center md:order-last"
          />
          <div className="space-y-8">
            {features.map((feature, index) => (
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