import Image from 'next/image'

export default function Partners() {
  const partners = [
    {
      name: "McGill University",
      description: "Collaboration with leading psychology experts",
      image: "/mcgill.png"
    },
    {
      name: "Neurosity",
      description: "Cutting-edge brainwave detection technology",
      image: "/neurosity.png"
    },
    {
      name: "Based on Research",
      description: "Research-backed meditation techniques",
      image: "/meditation.png"
    }
  ]

  return (
    <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary mb-4">Our Partners</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">Collaborating with Industry Leaders</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Oniji has partnered with renowned experts and hardware providers to bring you the best possible
            meditation experience.
          </p>
        </div>
        
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {partners.map((partner, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-2">
              <Image
                src={partner.image}
                width={120}
                height={120}
                alt={partner.name}
                className="aspect-square object-contain"
              />
              <p className="text-lg font-bold">{partner.name}</p>
              <p className="text-muted-foreground text-center">{partner.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}