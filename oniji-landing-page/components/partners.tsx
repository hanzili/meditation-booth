import Image from 'next/image'

const partners: { [key: string]: any } = {
  en: {
    subtitle: "Our Partners",
    title: "Collaborating with Industry Leaders",
    description: "Oniji has partnered with renowned experts and hardware providers to bring you the best possible meditation experience.",
    partners: [
      {
        name: "McGill University",
        description: "Collaboration with leading psychology experts",
        image: "/images/mcgill.png"
      },
      {
        name: "Neurosity",
        description: "Cutting-edge brainwave detection technology",
        image: "/images/neurosity.png"
      },
      {
        name: "Based on Research",
        description: "Research-backed meditation techniques",
        image: "/images/meditation.png"
      }
    ]
  },
  fr: {
    subtitle: "Nos Partenaires",
    title: "Collaboration avec des leaders de l'industrie",
    description: "Oniji a collaboré avec des experts renommés et des fournisseurs de matériel pour vous offrir la meilleure expérience de méditation possible.",
    partners: [
      {
        name: "Université McGill",
        description: "Collaboration avec des experts renommés en psychologie",
        image: "/images/mcgill.png"
      },
      {
        name: "Neurosity",
        description: "Technologie de détection de fréquence cardiaque avancée",
        image: "/images/neurosity.png"
      },
      {
        name: "Basé sur la recherche",
        description: "Techniques de méditation validées par la recherche",
        image: "/images/meditation.png"
      }
    ]
  }
}

export default function Partners({ params }: { params: { lang: string } }) {
  if (!partners[params.lang]) {
    return <></>
  }
  return (
    <section id="partners" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary mb-4">{partners[params.lang].subtitle}</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-4">{partners[params.lang].title}</h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            {partners[params.lang].description}
          </p>
        </div>
        
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {partners[params.lang].partners.map((partner: any, index: number) => (
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