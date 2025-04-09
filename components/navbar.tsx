"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { GlobalSearch } from "@/components/global-search"
import { useUser } from "@/lib/user-context"
import ProfileCard from "@/components/profile-card"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cart } = useCart()
  const { isLoggedIn } = useUser()

  // Update the routes array to remove makers
  const routes = [
    { href: "/", label: "Home" },
    { href: "/canteens", label: "Canteens" },
    { href: "/orders", label: "Orders" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-lg font-medium ${
                      pathname === route.href ? "text-primary" : "text-muted-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {!isLoggedIn && (
                  <Link
                    href="/login"
                    className="text-lg font-medium text-muted-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/applogo.png" alt="KL-Eats Logo" width={50} height={50} className="object-contain" />
          </Link>
        </div>

        {/* Desktop search */}
        <div className="hidden md:flex md:flex-1 md:justify-center md:px-4">
          <GlobalSearch />
        </div>

        <nav className="hidden lg:flex lg:items-center lg:gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm font-medium ${
                pathname === route.href ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <MobileSearch className="md:hidden" />

          <Link href="/cart">
            <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Button>
          </Link>

          {isLoggedIn ? (
            <ProfileCard />
          ) : (
            <>
              <Link href="/login" className="hidden lg:block">
                <Button variant="ghost" size="icon" aria-label="Login">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login" className="hidden lg:block">
                <Button variant="default">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

// Mobile search component
function MobileSearch({ className }: { className?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={className}>
      <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setOpen(true)}>
        <Search className="h-5 w-5" />
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="fixed left-0 right-0 top-0 p-4" onClick={(e) => e.stopPropagation()}>
            <GlobalSearch onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
