import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import MobileNavbar from "@/components/mobile-navbar"
import FloatingCartButton from "@/components/floating-cart-button"
import Footer from "@/components/footer"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "KL-Eats | Karthikeya version",
  description: "Order food from your favorite canteens",
  icons: {
    icon: "https://res.cloudinary.com/dqwm8wgg8/image/upload/v1742903388/vz9ixysiupcdkbezvs0q.png",
  },
    generator: 'karthikeya'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 pb-16 md:pb-0">{children}</main>
              <FloatingCartButton />
              <MobileNavbar />
              <Footer />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'