import { useRouter, useParams } from "next/navigation";

export function useLocalizedRouter() {
  const router = useRouter();
  const params = useParams();
  const lang = params.lang as string;

  return {
    ...router,
    push: (href: string, options?: any) => {
      const localizedHref = href.startsWith("/") ? `/${lang}${href}` : href;
      return router.push(localizedHref, options);
    },
    replace: (href: string, options?: any) => {
      const localizedHref = href.startsWith("/") ? `/${lang}${href}` : href;
      return router.replace(localizedHref, options);
    },
  };
}
