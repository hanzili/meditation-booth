'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter()

  const handleLanguageChange = (newLanguage: string) => {
    localStorage.setItem('language', newLanguage)
    router.push(window.location.pathname.replace(`/${locale}`, `/${newLanguage}`))
  }

  return (
    <div className="flex items-center space-x-2 text-foreground">
      <Globe className="h-4 w-4" />
      <Select value={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">Français</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}