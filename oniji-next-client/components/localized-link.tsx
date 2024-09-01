import Link from "next/link";
import { getLanguagePreference } from "@/lib/utils";

function LocalizedLink({ href, ...props }: { href: string }) {
  const lang = getLanguagePreference();
  const localizedTo = `/${lang}${href.startsWith("/") ? "" : "/"}${href}`;

  return <Link href={localizedTo} {...props} />;
}

export default LocalizedLink;
