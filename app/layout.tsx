import type { Metadata } from "next";
import { Inter, Space_Grotesk, Oswald } from "next/font/google";
import "./globals.css";
import Nav from "./_components/Nav";
import Footer from "./_components/Footer";
import BottomNav from "./_components/BottomNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const BASE_URL = "https://www.dunesbotanical.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DUNES | Shampoo Natural para Hombres — Hecho en Colombia",
    template: "%s | DUNES",
  },
  description:
    "Shampoo 100% natural y tónico capilar orgánico para hombres. Detiene la caída del cabello y activa el crecimiento con extractos botánicos colombianos. Sin químicos agresivos.",
  keywords: [
    "shampoo natural para hombres",
    "shampoo para la caída del cabello",
    "shampoo para la caída del cabello y crecimiento",
    "shampoo natural sin químicos",
    "shampoo orgánico Colombia",
    "shampoo para hombres Colombia",
    "shampoo 100% natural",
    "shampoo para hombres recomendado",
    "marcas de shampoo naturales en Colombia",
    "shampoo natural planta",
    "tratamiento capilar masculino",
    "crecimiento del cabello hombre",
    "shampoo con romero y jengibre",
    "cuidado capilar botánico",
  ],
  authors: [{ name: "DUNES Botanical Lab", url: BASE_URL }],
  creator: "DUNES Botanical Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { "es-CO": BASE_URL },
  },
  openGraph: {
    siteName: "DUNES",
    locale: "es_CO",
    type: "website",
    url: BASE_URL,
    title: "DUNES | Shampoo Natural para Hombres — Hecho en Colombia",
    description:
      "Shampoo 100% natural y tónico capilar orgánico para hombres. Con extractos botánicos colombianos. Sin químicos agresivos.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "DUNES — Shampoo Natural Botánico para Hombres" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DUNES | Shampoo Natural para Hombres — Hecho en Colombia",
    description:
      "Shampoo 100% natural y tónico capilar orgánico para hombres con extractos botánicos colombianos.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${oswald.variable} h-full`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-on-background font-body antialiased selection:bg-primary/20">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
