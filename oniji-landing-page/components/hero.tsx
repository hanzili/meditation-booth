import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
          <div className="flex flex-col justify-center space-y-4 text-foreground">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-foreground mb-5">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}