import type { Metadata } from "next";
import { Nunito, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-cursive",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bible Believing Mission | Christ-Centered Church",
  description:
    "We exist to raise people who believe God's Word, live by faith, and walk in the reality of God's promises.",
  icons: {
    icon: "/talknado_logo.jpeg",
    apple: "/talknado_logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${nunito.variable} ${dancingScript.variable} font-sans antialiased flex flex-col min-h-screen overflow-x-hidden`}
      >
        <Navbar />
        {/*
          pt-16 = mobile navbar height (64px, only one row shows)
          lg:pt-24 = desktop navbar height (64px nav + ~32px top info bar = 96px)
          The hero section on the homepage uses -mt-16 lg:-mt-24 to cancel this and go full screen.
          All other pages benefit from this padding so content starts below the navbar.
        */}
        <main className="flex-grow pt-16 lg:pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
