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
import { cn } from "@/lib/utils" // Make sure you have this utility function

export default function Hero() {
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

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4 text-foreground">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground mb-5 ">
              Recharge Your Mind with Oniji
            </h1>
            <p className="max-w-[600px] text-foreground/80 md:text-xl mb-5">
              Step into Open Booth® for a one-of-a-kind relaxation experience. Recharge, and unwind in a space designed to bring mindfulness into the fast-paced modern world.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="https://cal.com/oniji"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Book Now
              </Link>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Meditate Now</Button>
                </DialogTrigger>
                <DialogContent className={cn(
                  "sm:max-w-[425px]",
                  "max-w-[calc(100%-2rem)] mx-auto"
                )}>
                  <DialogHeader>
                    <DialogTitle>Are you in the meditation booth now?</DialogTitle>
                    <DialogDescription>
                      If you&apos;re in the booth, click &quot;Yes&quot; to start your in-booth session. Else, click &quot;No&quot; to start a virtual session.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={handleNoClick}>No</Button>
                    <Button onClick={handleMeditateNow}>Yes</Button>
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