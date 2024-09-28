"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const hero:any = {
  en: {
    title: "Recharge Your Mind with Oniji",
    description: "Step into Open Booth® for a one-of-a-kind relaxation experience. Recharge, and unwind in a space designed to bring mindfulness into the fast-paced modern world.",
    bookNowButton: "Book Now",
    meditateNowButton: "Meditate Now",
    dialogTitle: "Are you in the meditation booth now?",
    dialogDescription: "If you're in the booth, click &quot;Yes&quot; to start your in-booth session. Else, click &quot;No&quot; to start a virtual session.",
    dialogNoButton: "No",
    dialogYesButton: "Yes"
  },
  fr: {
    title: "Rechargez votre esprit avec Oniji",
    description: "Entrez dans Open Booth® pour une expérience de relaxation hors du commun. Rechargez-vous et détends-vous dans un espace conçu pour apporter la méditation à la vie moderne rapide.",
    bookNowButton: "Réserver maintenant",
    meditateNowButton: "Méditer maintenant",
    dialogTitle: "Êtes-vous dans le boîtier de méditation maintenant ?",
    dialogDescription: "Si vous êtes dans le boîtier, cliquez sur &quot;Oui&quot; pour commencer votre session dans le boîtier. Sinon, cliquez sur &quot;Non&quot; pour commencer une session virtuelle.",
    dialogNoButton: "Non",
    dialogYesButton: "Oui"
  }
}


export default function Hero({ params }: { params: { lang: string } }) {
  const [open, setOpen] = useState(false)

  const handleMeditateNow = () => {
    if (typeof window !== 'undefined') {
      const meditationUrl = process.env.NEXT_PUBLIC_MEDITATION_URL;

      window.open(meditationUrl, '_blank')
    }
    setOpen(false)
  }

  const handleNoClick = () => {
    setOpen(false)
    const dmoSection = document.getElementById("demo")
    if (dmoSection) {
      dmoSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!hero[params.lang]) {
    return <></>
  }
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4 text-foreground">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground mb-5 ">
              {hero[params.lang].title}
            </h1>
            <p className="max-w-[600px] text-foreground/80 md:text-xl mb-5">
              {hero[params.lang].description}
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="https://cal.com/oniji"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                {hero[params.lang].bookNowButton}
              </Link>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">{hero[params.lang].meditateNowButton}</Button>
                </DialogTrigger>
                <DialogContent className={cn(
                  "sm:max-w-[425px]",
                  "max-w-[calc(100%-2rem)] mx-auto"
                )}>
                  <DialogHeader>
                    <DialogTitle>{hero[params.lang].dialogTitle}</DialogTitle>
                    <DialogDescription>
                      {hero[params.lang].dialogDescription}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={handleNoClick}>{hero[params.lang].dialogNoButton}</Button>
                    <Button onClick={handleMeditateNow}>{hero[params.lang].dialogYesButton}</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}