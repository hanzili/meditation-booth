import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/wrappers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { ApolloWrapper } from "@/components/wrappers/apollo-wrapper";
import { getDictionary } from "@/lib/dictionaries/dictionaries";
import { DictionaryProvider } from "@/components/wrappers/dictionary-wrapper";
import LanguageSwitcher from "@/components/language-toggle";
import { UserProfile } from "@/components/user-profile";
import { UserProvider } from "@/components/wrappers/user-provider";
import { UserSetting } from "@/components/user-setting";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oniji",
  description: "Oniji",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const dict = await getDictionary(params.lang);

  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ApolloWrapper>
            <DictionaryProvider dict={dict}>
              <UserProvider>
                <div className="min-h-screen flex flex-col px-4 py-6 bg-background text-foreground">
                  <div className="flex items-center justify-between mb-6">
                    <ModeToggle />
                    <div className="flex items-center space-x-2">
                      <LanguageSwitcher locale={params.lang} />
                      <UserSetting />
                    </div>
                  </div>
                  <main className="flex-grow flex items-center justify-center">
                    {children}
                  </main>
                </div>
              </UserProvider>
            </DictionaryProvider>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
