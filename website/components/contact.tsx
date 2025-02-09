import Link from "next/link";
import { Button } from "@/components/ui/button";

const contact: any = {
  en: {
    title: "Contact Us",
    description:
      "Book your session with Oniji and unlock the power of personalized meditation.",
    button: "Book Your Session Now",
  },
  fr: {
    title: "Contactez-nous",
    description:
      "Réservez votre session avec Oniji et déverrouillez le potentiel de la méditation personnalisée.",
    button: "Réserver votre session maintenant",
  },
};

export default function Contact({ params }: { params: { lang: string } }) {
  if (!contact[params.lang]) {
    return <></>
  }
  return (
    <section
      id="contact"
      className="w-full py-12 md:py-24 lg:py-32 border-t flex justify-center items-center bg-background"
    >
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            {contact[params.lang].title}
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {contact[params.lang].description}
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2">
          <Link
            href="https://cal.com/oniji"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button type="button" className="w-full py-6 text-lg">
              {contact[params.lang].button}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
