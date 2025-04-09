"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Package, User, Search } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { GlobalSearch } from "@/components/global-search"

export default function MobileNavbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cart } = useCart()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkIfMobile()

      // Add event listener
      window.addEventListener("resize", checkIfMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Don't render on desktop or in admin/canteen owner portals
  if (!isMobile || pathname.includes("/admin") || pathname.includes("/canteen-owner")) {
    return null
  }

  const routes = [
    { href: "/", label: "Home", icon: Home },
    { href: "/canteens", label: "Canteens", icon: Home },
    {
      href: "/cart",
      label: "Cart",
      icon: ShoppingCart,
      badge: cart.length > 0 ? cart.reduce((total, item) => total + item.quantity, 0) : 0,
    },
    { href: "/orders", label: "Orders", icon: Package },
    { href: "/login", label: "Account", icon: User },
  ]

  // Add search functionality
  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  return (
    <>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm">
          <div className="fixed left-0 right-0 top-0 p-4">
            <GlobalSearch onClose={() => setIsSearchOpen(false)} />
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 z-50 w-full border-t bg-background md:hidden">
        <div className="flex h-16 items-center justify-around">
          {routes.map((route, index) => {
            // Insert search button in the middle
            if (index === 2) {
              return (
                <div key="search" className="flex flex-1 flex-col items-center justify-center">
                  <div
                    className="relative flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground"
                    onClick={handleSearchClick}
                  >
                    <Search className="h-5 w-5" />
                  </div>
                  <span className="text-xs">Search</span>
                </div>
              )
            }

            return (
              <Link key={route.href} href={route.href} className="flex flex-1 flex-col items-center justify-center">
                <div
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full ${pathname === route.href ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}
                >
                  <route.icon className="h-5 w-5" />
                  {route.badge > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                      {route.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs">{route.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
