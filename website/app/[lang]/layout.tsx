import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oniji Meditation",
  description: "Have a wonderful meditation session",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang}>
        <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}