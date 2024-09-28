import Link from "next/link"
import Image from 'next/image'
import LanguageToggle from "./language-toggle"
const header:any = {
  en: {
    logo: '/images/logo.png',
    links: [{name: 'Features', href: '#features'}, {name: 'Partners', href: '#partners'}, {name: 'Demo', href: '#demo'}, {name: 'Contact', href: '#contact'}]
  },
  fr: {
    logo: '/images/logo.png',
    links: [{name: 'Caractéristiques', href: '#features'}, {name: 'Partenaires', href: '#partners'}, {name: 'Démo', href: '#demo'}, {name: 'Contact', href: '#contact'}]
  }
}

export default function Header({ params }: { params: { lang: string } }) {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center">
        <Image src="/logo.png" alt="Oniji" width={128} height={96} className="h-24 w-32" />
        <span className="sr-only">Oniji</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {header[params.lang].links.map((item:any) => (
          <Link key={item.name} href={item.href} className="text-sm font-medium hover:underline underline-offset-4">
            {item.name}
          </Link>
        ))}
        <LanguageToggle params={params} />
      </nav>
    </header>
  )
}

