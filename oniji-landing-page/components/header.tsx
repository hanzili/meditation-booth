import Link from "next/link"
import Image from 'next/image'

export default function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link href="/" className="flex items-center justify-center">
        <Image src="/logo.png" alt="Oniji" width={128} height={96} className="h-24 w-32" />
        <span className="sr-only">Oniji</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {['Features', 'Partners', 'Contact'].map((item) => (
          <Link key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:underline underline-offset-4">
            {item}
          </Link>
        ))}
      </nav>
    </header>
  )
}